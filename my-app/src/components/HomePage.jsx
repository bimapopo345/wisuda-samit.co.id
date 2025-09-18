import { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted to bypass autoplay policy

  useEffect(() => {
    // Handle background music with better user interaction detection
    const audio = document.getElementById('backgroundMusic');
    
    const startMusic = () => {
      if (audio) {
        // Set volume to ensure it's audible
        audio.volume = 0.7;
        
        // Try muted autoplay first (browsers usually allow this)
        audio.muted = true;
        audio.play().then(() => {
          console.log('✅ Muted audio started, now unmuting...');
          setIsPlaying(true);
          
          // Unmute after successful play
          setTimeout(() => {
            audio.muted = false;
            setIsMuted(false);
            console.log('✅ Audio unmuted successfully');
          }, 100);
          
        }).catch(error => {
          console.log('❌ Even muted autoplay prevented:', error);
          setIsPlaying(false);
          
          // Try unmuted as backup
          setTimeout(() => {
            console.log('🔄 Trying unmuted audio...');
            audio.muted = false;
            audio.play().then(() => {
              setIsPlaying(true);
              setIsMuted(false);
              console.log('✅ Unmuted audio started');
            }).catch(e => {
              console.log('❌ Unmuted audio failed:', e);
            });
          }, 500);
        });
      }
    };

    // Audio event listeners
    if (audio) {
      audio.addEventListener('loadeddata', () => {
        setAudioLoaded(true);
        console.log('Audio loaded successfully');
      });
      audio.addEventListener('play', () => {
        setIsPlaying(true);
        console.log('Audio is playing');
      });
      audio.addEventListener('pause', () => {
        setIsPlaying(false);
        console.log('Audio is paused');
      });
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        console.log('Audio ended');
      });
      audio.addEventListener('error', (e) => {
        console.log('Audio error:', e);
        setAudioLoaded(false);
      });
    }

    // Try multiple times to start music immediately
    startMusic();
    
    // Immediate unmute attempt
    setTimeout(() => {
      if (audio && audio.muted && isPlaying) {
        console.log('🔄 Quick unmute attempt...');
        audio.muted = false;
        setIsMuted(false);
      }
    }, 50);
    
    // Try again after a short delay
    setTimeout(() => {
      if (!isPlaying) {
        console.log('🔄 Trying audio again after delay...');
        startMusic();
      }
    }, 1000);
    
    // Final aggressive attempt
    setTimeout(() => {
      if (!isPlaying) {
        console.log('🔄 Final aggressive attempt...');
        if (audio) {
          audio.muted = false;
          audio.volume = 0.7;
          audio.currentTime = 0;
          audio.play().then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            console.log('✅ Final attempt successful!');
          }).catch(e => {
            console.log('❌ All attempts failed:', e);
          });
        }
      }
    }, 2000);
    
    // Try when audio is fully loaded
    if (audio) {
      audio.addEventListener('canplaythrough', () => {
        if (!isPlaying) {
          console.log('🔄 Audio can play through, attempting to start...');
          startMusic();
        }
      });
      
      audio.addEventListener('loadeddata', () => {
        if (!isPlaying) {
          console.log('🔄 Audio data loaded, attempting to start...');
          setTimeout(() => startMusic(), 100);
        }
      });
    }

    // Backup: start music on ANY user interaction
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        console.log('User interaction detected, attempting to play audio...');
        
        if (audio) {
          // Force play audio after user interaction
          audio.play().then(() => {
            setIsPlaying(true);
            console.log('✅ Audio started successfully after user interaction');
          }).catch(error => {
            console.log('❌ Still failed to play audio:', error);
            // Try again after a short delay
            setTimeout(() => {
              audio.play().then(() => {
                setIsPlaying(true);
                console.log('✅ Audio started on retry');
              }).catch(e => console.log('❌ Retry failed:', e));
            }, 100);
          });
        }
        
        // Remove listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('mousemove', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      }
    };

    // Add multiple event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('mousemove', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);

    // Hide welcome overlay after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    // Create particles effect
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      const particlesContainer = document.getElementById('particles');
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 5000);
      }
    };

    // Create particles every 300ms
    const particleInterval = setInterval(createParticle, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(particleInterval);
      // Clean up event listeners
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // Manual audio control functions
  const toggleMusic = () => {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.log('Error playing audio:', error);
        });
      }
    }
  };

  return (
    <div className="home-container">
      {/* Welcome Overlay */}
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="graduation-cap">🎓</div>
          <div className="welcome-text">Selamat Wisuda!</div>
          <div className="subtitle">Pencapaian Gemilang Dimulai Dari Sini</div>
        </div>
      )}

      {/* Particles Effect */}
      <div className="particles" id="particles"></div>

      {/* Main Content */}
      <div className="main-content">
        <div className="hero">
          <h1>🎓 Selamat Datang</h1>
          <p>Halaman Utama Aplikasi Wisuda</p>
          <div className="description">
            <p>Selamat datang di aplikasi kami. Nikmati pengalaman wisuda yang berkesan!</p>
          </div>
        </div>

        {/* Google Form Iframe */}
        <div className="form-container">
          <iframe 
            className="graduation-form"
            src="https://docs.google.com/forms/d/e/1FAIpQLScGVHG4PM06VSHLAa5KlJ8v0eNp2nsnr_QWvhie3vzvy1aZPw/viewform?embedded=true"
            title="Graduation Form"
          >
          </iframe>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="audio-controls">
        <button 
          className={`audio-btn ${isPlaying ? 'playing' : 'paused'}`}
          onClick={toggleMusic}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
        <span className="audio-status">
          {!audioLoaded ? 'Loading...' : 
           isPlaying ? (isMuted ? 'Playing (Muted)' : 'Playing') : 
           'Click to play'}
        </span>
      </div>

      {/* Background Music */}
      <audio 
        autoPlay 
        loop 
        preload="auto" 
        id="backgroundMusic"
        playsInline
        muted={isMuted}
        controls={false}
        onLoadedData={() => {
          console.log('🎵 Audio element loaded');
        }}
        onCanPlay={() => {
          console.log('🎵 Audio can start playing');
        }}
        onPlay={() => {
          console.log('🎵 Audio started playing');
          setIsPlaying(true);
        }}
        onPause={() => {
          console.log('🎵 Audio paused');
          setIsPlaying(false);
        }}
        onError={(e) => console.log('❌ Audio error:', e)}
      >
        <source src="/Niji.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default HomePage;