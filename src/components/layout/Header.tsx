import React, { useState } from 'react';
import { BookOpen, Wallet, User, Menu, X, AlertCircle } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';

const Header: React.FC = () => {
  const { isConnected, address, user, balance, connect, disconnect, isLoading, error } = useWeb3();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/WhatsApp Image 2025-09-20 at 13.03.27_16565658.jpg"
                alt="EduChain Logo"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">
                EduChain
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                    <Wallet className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{balance} ETH</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{formatAddress(address!)}</p>
                    </div>
                  </div>

                  <button
                    onClick={disconnect}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={connect}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              {isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{formatAddress(address!)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <Wallet className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">{balance} ETH</span>
                    </div>
                  </div>
                  <button
                    onClick={disconnect}
                    className="w-full text-center py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <button
                  onClick={connect}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Error notification */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4 rounded">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={() => window.open('https://metamask.io/download/', '_blank')}
              className="ml-auto text-sm text-red-600 hover:text-red-800 underline"
            >
              Install MetaMask
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;