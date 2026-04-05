// whatsapp-chat.js - Widget WhatsApp pour GOIPTVPRO
(function() {
    // Configuration - MODIFIEZ CES VALEURS
    const config = {
        phoneNumber: '213550082871', // Votre numéro WhatsApp
        message: 'Bonjour ! Je suis intéressé par un abonnement IPTV. Pouvez-vous m'aider ?',
        position: 'right', // 'right' ou 'left'
        text: 'Discuter avec nous',
        bgColor: '#25d366',
        autoOpenDelay: 5000 // 5 secondes avant popup
    };

    // Créer le bouton flottant
    const button = document.createElement('a');
    button.href = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
    button.target = '_blank';
    button.rel = 'noopener';
    button.className = 'whatsapp-chat-widget';
    button.innerHTML = `
        <div class="whatsapp-chat-button" style="
            position: fixed;
            bottom: 30px;
            ${config.position}: 30px;
            width: 60px;
            height: 60px;
            background: ${config.bgColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            cursor: pointer;
            z-index: 9999;
            transition: transform 0.3s;
            text-decoration: none;
        ">
            <i class="fab fa-whatsapp"></i>
        </div>
        <div class="whatsapp-chat-tooltip" style="
            position: fixed;
            bottom: 100px;
            ${config.position}: 30px;
            background: white;
            color: #333;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 9998;
            font-family: Arial, sans-serif;
        ">${config.text}</div>
    `;

    document.body.appendChild(button);

    // Animation au survol
    const btn = button.querySelector('.whatsapp-chat-button');
    const tooltip = button.querySelector('.whatsapp-chat-tooltip');

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
        tooltip.style.opacity = '1';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        tooltip.style.opacity = '0';
    });

    // Message automatique après X secondes
    setTimeout(() => {
        if (!sessionStorage.getItem('whatsappPopupShown')) {
            showAutoMessage();
            sessionStorage.setItem('whatsappPopupShown', 'true');
        }
    }, config.autoOpenDelay);

    function showAutoMessage() {
        const popup = document.createElement('div');
        popup.className = 'whatsapp-auto-popup';
        popup.innerHTML = `
            <div style="
                position: fixed;
                bottom: 100px;
                ${config.position}: 30px;
                background: white;
                color: #333;
                padding: 15px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                max-width: 280px;
                z-index: 9997;
                font-family: Arial, sans-serif;
                animation: slideIn 0.3s ease;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: ${config.bgColor};
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        margin-right: 10px;
                        font-size: 20px;
                    ">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <div>
                        <div style="font-weight: bold; font-size: 14px;">Support GOIPTVPRO</div>
                        <div style="font-size: 12px; color: #25d366;">● En ligne</div>
                    </div>
                </div>
                <div style="font-size: 13px; margin-bottom: 12px; line-height: 1.4;">
                    👋 Bonjour ! Besoin d'aide pour choisir votre abonnement IPTV ? Je suis là pour vous aider !
                </div>
                <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}" 
                   target="_blank" 
                   rel="noopener"
                   style="
                    display: block;
                    background: ${config.bgColor};
                    color: white;
                    text-align: center;
                    padding: 12px;
                    border-radius: 20px;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: bold;
                    margin-bottom: 8px;
                ">💬 Démarrer la conversation</a>
                <button onclick="this.closest('.whatsapp-auto-popup').remove()" 
                        style="
                    width: 100%;
                    background: #f5f5f5;
                    border: none;
                    color: #666;
                    padding: 8px;
                    border-radius: 15px;
                    font-size: 12px;
                    cursor: pointer;
                ">Plus tard</button>
            </div>
        `;

        document.body.appendChild(popup);

        // Fermer automatiquement après 60 secondes
        setTimeout(() => {
            if (popup.parentNode) popup.remove();
        }, 60000);
    }

    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .whatsapp-auto-popup { animation: slideIn 0.3s ease; }
    `;
    document.head.appendChild(style);
})();
