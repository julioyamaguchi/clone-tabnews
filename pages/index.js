import { useState, useEffect } from 'react';

export default function Home() {
  const [showSurprise, setShowSurprise] = useState(false);

  // Função para criar os corações e brilhos
  const createParticles = () => {
    const create = (type) => {
      const particle = document.createElement('div');
      particle.innerText = type === 'heart' ? '❤️' : '✨';
      particle.style.position = 'fixed';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.bottom = '-50px'; // Começa fora da tela
      particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
      particle.style.animation = `floatUp ${Math.random() * 3 + 2}s linear forwards`;
      particle.style.zIndex = '9999';
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    // Cria um intervalo para gerar partículas continuamente
    const interval = setInterval(() => {
      create('heart');
      if (Math.random() > 0.5) create('sparkle');
    }, 150);

    // Retorna a função de limpeza para parar quando sair da tela
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (showSurprise) {
      // Inicia a chuva de amor
      const cleanup = createParticles();
      return cleanup;
    }
  }, [showSurprise]);

  return (
    <div style={styles.container}>
      {/* Estilos CSS injetados na página para as animações */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 1; }
          100% { transform: translateY(-110vh) scale(1.2) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {!showSurprise ? (
        <button 
          onClick={() => setShowSurprise(true)} 
          style={styles.button}
        >
          Clique aqui
        </button>
      ) : (
        <h1 style={styles.message}>
          Isabella Galdino,<br/>te amo meu amor ❤️
        </h1>
      )}
    </div>
  );
}

// Objeto de estilos (CSS-in-JS simples)
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    textAlign: 'center',
  },
  button: {
    padding: '15px 40px',
    fontSize: '1.5rem',
    color: '#fff',
    backgroundColor: '#ff6b81',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255, 107, 129, 0.4)',
    transition: 'transform 0.2s',
  },
  message: {
    fontSize: '3rem',
    color: '#d6336c',
    animation: 'fadeIn 2s ease-in-out',
    padding: '20px',
    lineHeight: '1.2',
  }
};