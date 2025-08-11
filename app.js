let contadorNombres = 3;

function agregarNombre() {
    contadorNombres++;
    const container = document.getElementById('nombresContainer');
    const newInputGroup = document.createElement('div');
    newInputGroup.className = 'input-group';
    newInputGroup.innerHTML = `
        <input type="text" placeholder="Nombre ${contadorNombres}" maxlength="30">
        <button class="remove-btn" onclick="removerNombre(this)" title="Eliminar">×</button>
    `;
    container.appendChild(newInputGroup);
    newInputGroup.querySelector('input').focus();
    container.scrollTop = container.scrollHeight;
}

function removerNombre(btn) {
    const inputGroups = document.querySelectorAll('.input-group');
    if (inputGroups.length > 3) {
        btn.parentElement.remove();
    }
}

function obtenerNombres() {
    const inputs = document.querySelectorAll('.input-group input');
    return Array.from(inputs)
        .map(input => input.value.trim())
        .filter(nombre => nombre !== '');
}

function realizarSorteo() {
    const nombres = obtenerNombres();
    
    if (nombres.length < 3) {
        alert('¡Necesitas al menos 3 nombres!');
        return;
    }

    const btn = document.getElementById('sorteoBtn');
    btn.innerHTML = '<div class="loading"></div>Sorteando...';
    btn.disabled = true;

    setTimeout(() => {
        const ganador = nombres[Math.floor(Math.random() * nombres.length)];
        
        document.getElementById('nombreSorteado').textContent = ganador;
        document.getElementById('resultado').classList.add('show');
        
        crearConfeti();
        
        btn.innerHTML = '🎲 Realizar Sorteo';
        btn.disabled = false;
        btn.style.display = 'none';
    }, 2000);
}

function reiniciar() {
    document.getElementById('resultado').classList.remove('show');
    document.getElementById('sorteoBtn').style.display = 'inline-block';
    
    const container = document.getElementById('nombresContainer');
    container.innerHTML = `
        <div class="input-group">
            <input type="text" placeholder="Nombre 1" maxlength="30">
            <button class="remove-btn" onclick="removerNombre(this)" title="Eliminar">×</button>
        </div>
        <div class="input-group">
            <input type="text" placeholder="Nombre 2" maxlength="30">
            <button class="remove-btn" onclick="removerNombre(this)" title="Eliminar">×</button>
        </div>
        <div class="input-group">
            <input type="text" placeholder="Nombre 3" maxlength="30">
            <button class="remove-btn" onclick="removerNombre(this)" title="Eliminar">×</button>
        </div>
    `;
    
    contadorNombres = 3;
    document.querySelector('.input-group input').focus();
}

function crearConfeti() {
    const particles = document.getElementById('particles');
    particles.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: hsl(${Math.random() * 360}, 70%, 60%);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: -10px;
            animation: fall ${2 + Math.random() * 3}s linear forwards;
        `;
        particles.appendChild(particle);
    }
    
    setTimeout(() => {
        particles.innerHTML = '';
    }, 5000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(500px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    document.querySelector('.input-group input').focus();
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !document.getElementById('resultado').classList.contains('show')) {
        realizarSorteo();
    }
});
