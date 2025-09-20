import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
  onProgress?: (progress: number) => void;
  className?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  onReady,
  onStateChange,
  onProgress,
  className = ''
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAPIReady, setIsAPIReady] = useState(false);

  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      initializePlayer();
    } else {
      // Load YouTube IFrame API
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // Set up the callback
      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
        initializePlayer();
      };
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
        try {
          playerInstanceRef.current.destroy();
        } catch (error) {
          console.log('Error destroying player:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isAPIReady && videoId) {
      initializePlayer();
    }
  }, [videoId, isAPIReady]);

  const initializePlayer = () => {
    if (!playerRef.current || !window.YT || !window.YT.Player || !videoId) {
      console.log('Player initialization failed - missing requirements');
      return;
    }

    // Destroy existing player if it exists
    if (playerInstanceRef.current) {
      try {
        playerInstanceRef.current.destroy();
      } catch (error) {
        console.log('Error destroying existing player:', error);
      }
    }

    try {
      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1, // Enable default controls initially
          disablekb: 0,
          fs: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handleStateChange,
          onError: handlePlayerError
        },
      });
    } catch (error) {
      console.error('Error creating YouTube player:', error);
    }
  };

  const handlePlayerReady = (event: any) => {
    console.log('YouTube player ready');
    setIsReady(true);
    try {
      const videoDuration = event.target.getDuration();
      setDuration(videoDuration);
      onReady?.();
      
      // Start progress tracking
      startProgressTracking();
    } catch (error) {
      console.error('Error in handlePlayerReady:', error);
    }
  };

  const handleStateChange = (event: any) => {
    const state = event.data;
    console.log('Player state changed:', state);
    
    // YouTube Player States:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    setIsPlaying(state === 1); // YT.PlayerState.PLAYING = 1
    onStateChange?.(state);

    if (state === 1) { // Playing
      startProgressTracking();
    } else {
      stopProgressTracking();
    }
  };

  const handlePlayerError = (event: any) => {
    console.error('YouTube player error:', event.data);
    // Error codes: 2 (invalid parameter), 5 (HTML5 player error), 100 (video not found), 101/150 (not allowed in embedded players)
  };

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      if (playerInstanceRef.current && typeof playerInstanceRef.current.getCurrentTime === 'function') {
        try {
          const currentTime = playerInstanceRef.current.getCurrentTime();
          const totalDuration = playerInstanceRef.current.getDuration();
          if (totalDuration > 0) {
            const progressPercent = (currentTime / totalDuration) * 100;
            setProgress(progressPercent);
            onProgress?.(progressPercent);
          }
        } catch (error) {
          console.error('Error tracking progress:', error);
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (!playerInstanceRef.current) return;

    try {
      if (isPlaying) {
        playerInstanceRef.current.pauseVideo();
      } else {
        playerInstanceRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  };

  const toggleMute = () => {
    if (!playerInstanceRef.current) return;

    try {
      if (isMuted) {
        playerInstanceRef.current.unMute();
      } else {
        playerInstanceRef.current.mute();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerInstanceRef.current || !duration) return;

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickPercent = (clickX / width) * 100;
      const seekTime = (clickPercent / 100) * duration;

      playerInstanceRef.current.seekTo(seekTime, true);
      setProgress(clickPercent);
    } catch (error) {
      console.error('Error seeking video:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const enterFullscreen = () => {
    try {
      if (playerInstanceRef.current && playerInstanceRef.current.getIframe) {
        const iframe = playerInstanceRef.current.getIframe();
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  };

  if (!videoId) {
    return (
      <div className={`aspect-video bg-gray-900 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No video available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden group ${className}`}>
      {/* YouTube Player */}
      <div className="aspect-video w-full">
        <div 
          ref={playerRef} 
          className="w-full h-full"
          style={{ minHeight: '315px' }}
        />
      </div>

      {/* Custom Controls Overlay */}
      {isReady && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110 pointer-events-auto"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
            {/* Progress Bar */}
            <div
              className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-3 hover:h-3 transition-all duration-200"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <span className="text-white text-sm">
                  {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={enterFullscreen}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!isReady && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}

      {/* Video Title Overlay */}
      <div className="absolute top-4 left-4 right-4 pointer-events-none">
        <h3 className="text-white text-lg font-semibold bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default YouTubePlayer;