// Notification sound utility
export const playNotificationSound = () => {
    // Kitchen timer bell sound - a pleasant ding
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3');
    audio.volume = 0.6;
    audio.play().catch((error) => {
        console.warn('Could not play notification sound:', error);
    });
};
