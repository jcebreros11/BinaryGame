function vibrationUtils() {

    const vibrate = (pattern) => {

        if ("vibrate" in navigator) {
            navigator.vibrate(pattern);
        }
    };

    return {
        vibrate
    };
}

export default vibrationUtils;