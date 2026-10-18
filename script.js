/* Сброс стилей */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    overflow: hidden; /* Чтобы не было полос прокрутки */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', sans-serif;
    
    /* МАГИЯ НЕОНОВОГО ФОНА */
    background: linear-gradient(-45deg, #0a0a0f, #1a0033, #001a33, #0d001a, #000000);
    background-size: 400% 400%;
    animation: neonGradient 15s ease infinite;
}

/* Анимация переливания */
@keyframes neonGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Контейнер для будущей игры (пока просто текст по центру) */
.game-container {
    text-align: center;
    z-index: 10;
}

h1 {
    color: #fff;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    
    /* Неоновое свечение текста */
    text-shadow: 
        0 0 10px #00f2fe,
        0 0 20px #00f2fe,
        0 0 40px #ff2e63,
        0 0 80px #ff2e63;
    
    animation: pulseText 2s infinite alternate;
}

@keyframes pulseText {
    from { opacity: 0.8; }
    to { opacity: 1; transform: scale(1.02); }
}
