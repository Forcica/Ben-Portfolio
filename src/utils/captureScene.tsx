export const captureScene = () => {
    try {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            throw new Error('Canvas non trouvé');
        }

        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'scene-static.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.error('Erreur lors de la capture:', error);
    }
};

// Ajoutez temporairement un bouton pour capturer
<button onClick={captureScene}>Capture Scene</button>