// Clase principal del juego - Demuestra el uso del objeto 'this'
/**
 * Esto funciona en versiones modernas de JavaScript (ES6+).
 * Asegúrate de que tu entorno soporte clases y módulos.
 */
class EventHunterGame {
    constructor() {
        // Propiedades del juego - 'this' se refiere a la instancia del juego
        this.score = 0;
        this.timeLeft = 60;
        this.level = 1;
        this.gameRunning = false;
        this.targets = [];
        this.gameTimer = null;
        this.spawnTimer = null;

        // Elementos del DOM
        this.gameArea = document.getElementById('gameArea');
        this.scoreElement = document.getElementById('score');
        this.timeElement = document.getElementById('time');
        this.levelElement = document.getElementById('level');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.hiddenInput = document.getElementById('hiddenInput');
        this.conceptLog = document.getElementById('conceptLog');
        this.gameOver = document.getElementById('gameOver');
        this.finalScore = document.getElementById('finalScore');

        // Inicializar eventos - Demuestra diferentes tipos de eventos
        this.initEvents();
        
        this.logConcept('🎯 Juego inicializado. Objeto "this" configurado correctamente.');
    }

    // Método para inicializar eventos - Demuestra addEventListener
    initEvents() {
        // Evento click - uno de los eventos más utilizados
        this.startBtn.addEventListener('click', () => {
            this.startGame();
            this.logConcept('📱 Evento "click" en botón start - addEventListener usado');
        });

        // Evento click para detener
        this.stopBtn.addEventListener('click', () => {
            this.stopGame();
            this.logConcept('🛑 Evento "click" en botón stop');
        });

        // Evento keydown global - Demuestra eventos de teclado
        document.addEventListener('keydown', (event) => {
            if (this.gameRunning) {
                this.handleKeyPress(event);
                this.logConcept(`⌨️ Evento "keydown" detectado: ${event.key}`);
            }
        });

        // Evento para mantener el foco en el input oculto
        this.hiddenInput.addEventListener('blur', () => {
            if (this.gameRunning) {
                setTimeout(() => this.hiddenInput.focus(), 100);
            }
        });
    }

    // Iniciar el juego - Demuestra uso de 'this' en métodos
    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.timeLeft = 60;
        this.level = 1;
        this.gameOver.style.display = 'none';
        
        // Enfocar input oculto para eventos de teclado
        this.hiddenInput.focus();
        
        this.updateUI();
        this.logConcept('🚀 Juego iniciado - "this" mantiene el estado del juego');

        // Timer principal del juego
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateUI();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);

        // Timer para generar objetivos
        this.spawnTimer = setInterval(() => {
            this.createTarget();
        }, 2000 - (this.level * 100)); // Más rápido con cada nivel
    }

    // Detener el juego
    stopGame() {
        this.gameRunning = false;
        this.clearTimers();
        this.clearTargets();
        this.logConcept('⏹️ Juego detenido manualmente');
    }

    // Finalizar el juego
    endGame() {
        this.gameRunning = false;
        this.clearTimers();
        this.clearTargets();
        this.finalScore.textContent = this.score;
        this.gameOver.style.display = 'block';
        this.logConcept(`🎉 Juego terminado. Puntuación final: ${this.score}`);
    }

    // Crear un objetivo - Demuestra creación dinámica de elementos y eventos
    createTarget() {
        if (!this.gameRunning) return;

        const targetTypes = ['click', 'mouseover', 'keydown', 'focus'];
        const randomType = targetTypes[Math.floor(Math.random() * targetTypes.length)];
        
        const target = document.createElement('div');
        target.className = `target ${randomType}`;
        
        // Posición aleatoria
        const maxX = this.gameArea.offsetWidth - 60;
        const maxY = this.gameArea.offsetHeight - 60;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        target.style.left = x + 'px';
        target.style.top = y + 'px';
        
        // Contenido según el tipo
        const typeEmojis = {
            'click': '🖱️',
            'mouseover': '👆',
            'keydown': '⌨️',
            'focus': '🎯'
        };
        
        target.textContent = typeEmojis[randomType];
        target.setAttribute('tabindex', '0'); // Para que pueda recibir focus

        // Agregar eventos específicos según el tipo - Demuestra diferentes eventos
        this.addTargetEvents(target, randomType);
        
        this.gameArea.appendChild(target);
        this.targets.push(target);

        // Remover automáticamente después de 4 segundos
        setTimeout(() => {
            if (target.parentNode) {
                this.removeTarget(target);
                this.logConcept(`⏰ Objetivo ${randomType} removido por timeout`);
            }
        }, 4000);
    }

    // Agregar eventos específicos a cada objetivo - Demuestra manejo de 'this' en callbacks
    addTargetEvents(target, type) {
        switch(type) {
            case 'click':
                // Evento click - 'this' en el callback se refiere al elemento
                target.addEventListener('click', (event) => {
                    // Usamos arrow function para mantener 'this' del juego
                    this.handleTargetHit(target, 'click', 10);
                    this.logConcept('🖱️ Evento "click" - this en callback mantenido con arrow function');
                });
                break;

            case 'mouseover':
                // Evento mouseover - se dispara al pasar el mouse
                target.addEventListener('mouseover', (event) => {
                    this.handleTargetHit(target, 'mouseover', 5);
                    this.logConcept('👆 Evento "mouseover" disparado');
                });
                break;

            case 'keydown':
                // Este se maneja globalmente
                target.dataset.type = 'keydown';
                break;

            case 'focus':
                // Evento focus - se dispara al enfocar el elemento
                target.addEventListener('focus', (event) => {
                    this.handleTargetHit(target, 'focus', 15);
                    this.logConcept('🎯 Evento "focus" disparado');
                });
                
                // También agregar click para facilitar el focus
                target.addEventListener('click', (event) => {
                    target.focus();
                });
                break;
        }
    }

    // Manejar teclas presionadas
    handleKeyPress(event) {
        // Buscar objetivos de tipo keydown
        const keydownTargets = this.targets.filter(target => 
            target.dataset.type === 'keydown'
        );
        
        if (keydownTargets.length > 0) {
            const target = keydownTargets[0]; // Tomar el primero
            this.handleTargetHit(target, 'keydown', 8);
        }
    }

    // Manejar cuando se acierta un objetivo
    handleTargetHit(target, eventType, points) {
        this.score += points;
        this.updateLevel();
        this.removeTarget(target);
        
        this.logConcept(`✅ Objetivo ${eventType} acertado! +${points} puntos`);
        
        // Efecto visual
        this.showScoreEffect(target, points);
    }

    // Mostrar efecto visual de puntuación
    showScoreEffect(target, points) {
        const effect = document.createElement('div');
        effect.textContent = `+${points}`;
        effect.style.position = 'absolute';
        effect.style.left = target.style.left;
        effect.style.top = target.style.top;
        effect.style.color = '#2ecc71';
        effect.style.fontWeight = 'bold';
        effect.style.fontSize = '20px';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'fadeUp 1s ease-out forwards';
        
        // CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeUp {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-30px); }
            }
        `;
        document.head.appendChild(style);
        
        this.gameArea.appendChild(effect);
        
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1000);
    }

    // Remover objetivo
    removeTarget(target) {
        const index = this.targets.indexOf(target);
        if (index > -1) {
            this.targets.splice(index, 1);
        }
        if (target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }

    // Limpiar todos los objetivos
    clearTargets() {
        this.targets.forEach(target => {
            if (target.parentNode) {
                target.parentNode.removeChild(target);
            }
        });
        this.targets = [];
    }

    // Actualizar nivel
    updateLevel() {
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.logConcept(`🆙 ¡Nivel ${this.level} alcanzado!`);
        }
    }

    // Actualizar interfaz
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.timeElement.textContent = this.timeLeft;
        this.levelElement.textContent = this.level;
    }

    // Limpiar timers
    clearTimers() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
            this.spawnTimer = null;
        }
    }

    // Registrar conceptos aprendidos
    logConcept(message) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        this.conceptLog.appendChild(entry);
        this.conceptLog.scrollTop = this.conceptLog.scrollHeight;
    }
}

// Inicializar el juego cuando la página carga - Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new EventHunterGame();
    console.log('🎮 Juego EventHunter iniciado - Todos los conceptos de JavaScript implementados!');
});