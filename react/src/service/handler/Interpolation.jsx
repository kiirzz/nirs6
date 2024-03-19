export default function Interpolation(signal, newLength) {
    let originalIndices = [];
    for (let i = 0; i < signal.length; i++) {
        originalIndices.push(i);
    }

    let newIndices = [];
    for (let i = 0; i < newLength; i++) {
        newIndices.push((signal.length - 1) * i / (newLength - 1));
    }

    let interpolatedSignal = [];
    for (let i = 0; i < newLength; i++) {
        interpolatedSignal.push(interpolate(originalIndices, signal, newIndices[i]));
    }

    return interpolatedSignal;
}

function interpolate(x, y, x0) {
    let i = 1;
    while (x[i] < x0) {
        i++;
    }

    let x1 = x[i - 1];
    let x2 = x[i];
    let y1 = y[i - 1];
    let y2 = y[i];

    return y1 + (x0 - x1) * (y2 - y1) / (x2 - x1);
}