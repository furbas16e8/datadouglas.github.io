/**
 * Anti-Gravity Hero Effect
 * Inspired by Google Antigravity and Creative Coding principles.
 * Uses Matter.js for physics simulation.
 */

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero-bg');
    if (!heroSection) return;

    // Módulo aliases do Matter.js
    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Common = Matter.Common,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events,
        Body = Matter.Body,
        Vector = Matter.Vector;

    // Cria a engine
    const engine = Engine.create();
    engine.world.gravity.y = 0; // Gravidade Zero

    // Cria o renderer
    const render = Render.create({
        element: heroSection,
        engine: engine,
        options: {
            width: heroSection.clientWidth,
            height: heroSection.clientHeight,
            pixelRatio: window.devicePixelRatio,
            background: 'transparent', // Importante para ver o gradiente CSS atrás
            wireframes: false,
            showAngleIndicator: false
        }
    });

    // Função para criar paredes
    let walls = [];
    const wallThick = 50;

    function createWalls() {
        const width = render.options.width;
        const height = render.options.height;

        // Remove paredes antigas se existirem
        Composite.remove(engine.world, walls);
        walls = [];

        const options = {
            isStatic: true,
            render: { visible: false } // Paredes invisíveis
        };

        walls = [
            Bodies.rectangle(width / 2, -wallThick / 2, width, wallThick, options), // Topo
            Bodies.rectangle(width / 2, height + wallThick / 2, width, wallThick, options), // Base
            Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height, options), // Direita
            Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height, options) // Esquerda
        ];

        Composite.add(engine.world, walls);
    }

    createWalls();

    // Cria formas flutuantes
    const shapes = [];
    const count = 20;
    const colors = [
        'rgba(255, 255, 255, 0.03)', // Branco muito sutil
        'rgba(255, 255, 255, 0.05)', // Branco sutil
        'rgba(255, 255, 255, 0.08)', // Branco um pouco mais forte
        'rgba(100, 149, 237, 0.05)', // Azul Cornflower ultra light
        'rgba(65, 105, 225, 0.05)'   // Royal Blue ultra light
    ];

    for (let i = 0; i < count; i++) {
        const x = Common.random(0, render.options.width);
        const y = Common.random(0, render.options.height);
        const size = Common.random(20, 60);
        const color = Common.choose(colors);
        const type = Common.choose(['circle', 'polygon', 'rectangle']);

        let body;
        const bodyOpts = {
            frictionAir: 0.02, // Resistência do ar para movimento fluido
            restitution: 0.8,  // Elasticidade
            render: {
                fillStyle: color,
                strokeStyle: 'rgba(255,255,255,0.1)',
                lineWidth: 1
            }
        };

        if (type === 'circle') {
            body = Bodies.circle(x, y, size, bodyOpts);
        } else if (type === 'polygon') {
            body = Bodies.polygon(x, y, Common.random(3, 6), size, bodyOpts);
        } else {
            body = Bodies.rectangle(x, y, size * 1.5, size, bodyOpts);
        }

        // Dá um impuslo inicial aleatório suave
        Body.setVelocity(body, {
            x: Common.random(-1, 1),
            y: Common.random(-1, 1)
        });

        // Adiciona rotação aleatória
        Body.setAngularVelocity(body, Common.random(-0.02, 0.02));

        shapes.push(body);
    }

    Composite.add(engine.world, shapes);

    // Adiciona controle de Mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(engine.world, mouseConstraint);

    // Remove captura de scroll do Matter.js para não travar a página
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Efeito de Repulsão Suave (Campo de força)
    Events.on(engine, 'beforeUpdate', function () {
        const mousePosition = mouse.position;
        const maxDist = 200; // Raio de influência

        shapes.forEach(body => {
            const dx = body.position.x - mousePosition.x;
            const dy = body.position.y - mousePosition.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist && dist > 0) {
                const forceMagnitude = (1 - dist / maxDist) * 0.00005; // Força muito sutil
                const force = {
                    x: (dx / dist) * forceMagnitude,
                    y: (dy / dist) * forceMagnitude
                };

                Body.applyForce(body, body.position, force);
            }
        });
    });

    // Ajuste de redimensionamento da janela
    window.addEventListener('resize', () => {
        render.canvas.width = heroSection.clientWidth;
        render.canvas.height = heroSection.clientHeight;
        render.options.width = heroSection.clientWidth;
        render.options.height = heroSection.clientHeight;

        createWalls();
    });

    // Inicia a simulação
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
});
