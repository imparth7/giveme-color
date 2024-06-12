const givemeColor = async () => {
    const chalk = (await import("chalk")).default;
    const { exec } = (await import("child_process")).default;
    // Now you can use chalk

    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert decimal to hexadecimal format
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Calculate luminance
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    // Return white or black based on luminance
    let lum = luminance > 0.5 ? "#000" : "#FFF";

    // Concatenate the components to form the color code
    const color = `#${redHex}${greenHex}${blueHex}`;

    // Copy text to clipboard
    const isWindows = process.platform === "win32";
    const command = isWindows
        ? `echo ${color} | clip`
        : `echo -n ${color} | pbcopy`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            // console.error(`Error copying text to clipboard: ${error.message}`);
            return;
        }
        if (stderr) {
            // console.error(`stderr: ${stderr}`);
            return;
        }
        // console.log(`Color "${color}" copied to clipboard.`);
    });

    console.log(chalk.bgRgb(red, green, blue).hex(lum).visible(color));
    // return color;
};

module.exports = givemeColor();
