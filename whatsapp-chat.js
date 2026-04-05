// ============================================
// WHATSAPP CHAT WIDGET - GOIPTVPRO
// Configuration en haut, ne pas toucher le code en bas
// ============================================

const WHATSAPP_CONFIG = {
    // VOTRE NUMÉRO WHATSAPP (avec indicatif pays)
    // Exemple: 213550082871 pour Algérie
    phoneNumber: '213550082871',

    // MESSAGE PRÉ-REMPLI quand on clique
    message: 'Bonjour ! Je suis intéressé par un abonnement IPTV. Pouvez-vous m'aider ?',

    // POSITION: 'right' (droite) ou 'left' (gauche)
    position: 'right',

    // TEXTE AU SURVOL
    hoverText: 'Discuter avec nous',

    // DÉLAI AVANT POPUP (en millisecondes)
    // 5000 = 5 secondes | 10000 = 10 secondes | 0 = désactivé
    popupDelay: 5000,

    // COULEUR DU BOUTON (laissez par défaut ou modifiez)
    buttonColor: '#25d366',

    // TITRE DU POPUP
    popupTitle: 'Support GOIPTVPRO',

    // MESSAGE DU POPUP
    popupMessage: "👋 Bonjour ! Besoin d'aide pour choisir votre abonnement IPTV ? Notre équipe vous répond en moins de 5 minutes !"
};

// ============================================
// CODE DU WIDGET - NE PAS MODIFIER CI-DESSOUS
// ============================================

(function() {
    'use strict';

    const cfg = WHATSAPP_CONFIG;
    const position = cfg.position === 'left' ? 'left' : 'right';

    // Créer le conteneur principal
    const widget = document.createElement('div');
    widget.id = 'whatsapp-widget';
    widget.style.cssText = `
        position: fixed;
        bottom: 30px;
        ${position}: 30px;
        z-index: 9999;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    // URL WhatsApp
    const whatsappUrl = `https://wa.me/${cfg.phoneNumber}?text=${encodeURIComponent(cfg.message)}`;

    // Bouton principal
    widget.innerHTML = `
        <a href="${whatsappUrl}" 
           target="_blank" 
           rel="noopener noreferrer"
           id="whatsapp-btn"
           style="
               width: 60px;
               height: 60px;
               background: linear-gradient(135deg, ${cfg.buttonColor}, #128c7e);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               color: white;
               font-size: 30px;
               box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
               cursor: pointer;
               text-decoration: none;
               transition: transform 0.3s ease;
               animation: whatsapp-pulse 2s infinite;
           ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" fill="white">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 185.1-186.6 185.1zm101.7-138.7c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
        </a>
        <div id="whatsapp-tooltip" style="
            position: absolute;
            bottom: 75px;
            ${position}: 0;
            background: #1a1a25;
            color: #fff;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 14px;
            border: 1px solid rgba(0, 204, 255, 0.3);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            white-space: nowrap;
        ">${cfg.hoverText}</div>
    `;

    document.body.appendChild(widget);

    // Animations CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes whatsapp-pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        #whatsapp-btn:hover {
            transform: scale(1.1) !important;
        }
        #whatsapp-btn:hover + #whatsapp-tooltip {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Popup automatique
    if (cfg.popupDelay > 0) {
        setTimeout(() => {
            if (!sessionStorage.getItem('whatsappPopupShown')) {
                showPopup();
                sessionStorage.setItem('whatsappPopupShown', 'true');
            }
        }, cfg.popupDelay);
    }

    function showPopup() {
        // Vérifier si popup existe déjà
        if (document.getElementById('whatsapp-popup')) return;

        const popup = document.createElement('div');
        popup.id = 'whatsapp-popup';
        popup.style.cssText = `
            position: fixed;
            bottom: 100px;
            ${position}: 30px;
            width: 300px;
            background: #1a1a25;
            border: 1px solid rgba(0, 204, 255, 0.3);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 9998;
            animation: slideUp 0.3s ease;
        `;

        popup.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, ${cfg.buttonColor}, #128c7e);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    margin-right: 15px;
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="28" height="28" fill="white">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 185.1-186.6 185.1zm101.7-138.7c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                </div>
                <div>
                    <div style="font-weight: bold; color: #fff; font-size: 16px;">${cfg.popupTitle}</div>
                    <div style="font-size: 12px; color: #25d366;">● En ligne</div>
                </div>
            </div>
            <div style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                ${cfg.popupMessage}
            </div>
            <a href="${whatsappUrl}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="
                display: block;
                background: linear-gradient(135deg, ${cfg.buttonColor}, #128c7e);
                color: white;
                text-align: center;
                padding: 12px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 10px;
                transition: all 0.3s;
            " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 5px 20px rgba(37, 211, 102, 0.4)'" 
               onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                💬 Démarrer la conversation
            </a>
            <button onclick="closeWhatsAppPopup()" 
                    style="
                width: 100%;
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #a1a1aa;
                padding: 10px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.3s;
            " onmouseover="this.style.background='rgba(255,255,255,0.05)';this.style.color='#fff'"
               onmouseout="this.style.background='transparent';this.style.color='#a1a1aa'">
                Plus tard
            </button>
        `;

        document.body.appendChild(popup);

        // Fermer automatiquement après 60 secondes
        setTimeout(() => {
            if (popup.parentNode) popup.remove();
        }, 60000);
    }

    // Fonction globale pour fermer le popup
    window.closeWhatsAppPopup = function() {
        const popup = document.getElementById('whatsapp-popup');
        if (popup) popup.remove();
    };

    console.log('✅ WhatsApp Widget chargé avec succès!');
})();
