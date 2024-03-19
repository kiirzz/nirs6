export default function convolution(frequencyData, filter, gain) {
    const result = new Array(frequencyData.length + filter.length - 1).fill(0);

    for (let i = 0; i < frequencyData.length; i++) {
        for (let j = 0; j < filter.length; j++) {
            result[i + j] += frequencyData[i] * filter[j] * gain; // Apply gain during convolution
        }
    }

    return result;
}