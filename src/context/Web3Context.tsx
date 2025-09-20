import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  isConnected: boolean;
  address: string | null;
  user: User | null;
  balance: string;
  network: string;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToShardeum: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState('0');
  const [network, setNetwork] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
    setupEventListeners();
  }, []);

  const setupEventListeners = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnect();
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
      fetchUserData(accounts[0]);
      fetchBalance(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          await fetchUserData(accounts[0]);
          await fetchBalance(accounts[0]);
          await getNetwork();
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        setError('Failed to check wallet connection');
      }
    }
  };

  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        await fetchUserData(accounts[0]);
        await fetchBalance(accounts[0]);
        await getNetwork();
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        setError('Connection rejected by user');
      } else {
        setError('Failed to connect wallet');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setUser(null);
    setBalance('0');
    setNetwork('');
    setError(null);
  };

  const getNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      switch (chainId) {
        case '0x1':
          setNetwork('Ethereum Mainnet');
          break;
        case '0x1f91': // 8081 in hex
          setNetwork('Shardeum Unstablenet');
          break;
        default:
          setNetwork('Unknown Network');
      }
    } catch (error) {
      console.error('Error getting network:', error);
    }
  };

  const switchToShardeum = async () => {
    if (typeof window.ethereum === 'undefined') return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1f91' }], // 8081 in hex
      });
      setNetwork('Shardeum Unstablenet');
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x1f91',
              chainName: 'Shardeum Unstablenet',
              nativeCurrency: {
                name: 'Shardeum',
                symbol: 'SHM',
                decimals: 18,
              },
              rpcUrls: ['https://dapps.shardeum.org/'],
              blockExplorerUrls: ['https://explorer-dapps.shardeum.org/'],
            }],
          });
          setNetwork('Shardeum Unstablenet');
        } catch (addError) {
          console.error('Error adding Shardeum network:', addError);
          setError('Failed to add Shardeum network');
        }
      } else {
        console.error('Error switching to Shardeum:', error);
        setError('Failed to switch to Shardeum network');
      }
    }
  };

  const fetchUserData = async (walletAddress: string) => {
    try {
      // Mock user data - in production, fetch from your backend
      const mockUser: User = {
        id: `user-${walletAddress.slice(-6)}`,
        address: walletAddress,
        name: `User ${walletAddress.slice(-4)}`,
        email: `user${walletAddress.slice(-4)}@educhain.com`,
        role: 'learner',
        reputation: 750,
        totalSHM: 1250,
        joinedAt: '2024-01-15T10:00:00Z'
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchBalance = async (walletAddress: string) => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [walletAddress, 'latest']
        });
        // Convert from wei to ether and format
        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
        setBalance(balanceInEth.toFixed(4));
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0');
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address,
        user,
        balance,
        network,
        isLoading,
        error,
        connect,
        disconnect,
        switchToShardeum
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};