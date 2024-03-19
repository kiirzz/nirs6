import { useEffect, useRef } from "react";
import { useAudio } from "../../electron/renderer/context/Audio";
import { useGain } from "../../electron/renderer/context/Gain";
import { filter_0_100 } from "../filter/filter_0_100"
import { filter_100_1935 } from "../filter/filter_100_1935";
import { filter_1935_4515 } from "../filter/filter_1935_4515";
import { filter_4515_9675 } from "../filter/filter_4515_9675";
import { filter_9675_ } from "../filter/filter_9675_+";

const Processer = () => {
    const listBand = [
        {min: 0, max: 100},
        {min: 100, max: 1935},
        {min: 1935, max: 4515},
        {min: 4515, max: 9675},
        {min: 9675, max: 22000},
    ]

    const { audioElement, inputFrequencyData, setOutputRawData } = useAudio();
    const { gain1, gain2, gain3, gain4, gain5 } = useGain();

    const workerRefs = useRef([]);

    useEffect(() => {
        return () => {
            workerRefs.current.forEach(worker => worker.terminate());
        };
    }, []);
    
    useEffect(() => {
        if (audioElement  && inputFrequencyData) {
            const workerNumber = listBand.length;
            let completedWorkers = 0;
            const results = [];

            const handleWorkerMessage = (index, result) => {
                results[index] = result;
                completedWorkers++;

                if (completedWorkers === workerNumber) {
                    const combinedResult = results.flat();
                    setOutputRawData(combinedResult);
                }
            };

            listBand.forEach((band, index) => {
                const filter = getFilterForBand(index);
                const gain = getGainForBand(index);
                
                const workerScript = `
                    function convolution(frequencyData, filter, gain) {
                        const result = new Array(frequencyData.length + filter.length - 1).fill(0);
                        const linearGain = Math.pow(10, gain / 20);

                        for (let i = 0; i < frequencyData.length; i++) {
                            for (let j = 0; j < filter.length; j++) {
                                result[i + j] += frequencyData[i] * filter[j] * linearGain;
                            }
                        }

                        return result;
                    }

                    self.addEventListener('message', function(e) {
                        const { index, frequencyData, filter, gain } = e.data;
                        const result = convolution(frequencyData, filter, gain);
                        self.postMessage({ index, result });
                    });
                `;

                const blob = new Blob([workerScript], { type: 'application/javascript' });
                const worker = new Worker(URL.createObjectURL(blob));

                worker.onmessage = (e) => {
                    const { index, result } = e.data;
                    handleWorkerMessage(index, result);
                };

                workerRefs.current.push(worker);

                worker.postMessage({
                    index,
                    frequencyData: inputFrequencyData.slice(band.min, band.max + 1),
                    filter,
                    gain,
                });
            });
        }
    }, [audioElement, inputFrequencyData, gain1, gain2, gain3, gain4, gain5])

    const getFilterForBand = (index) => {
        switch (index) {
            case 0:
                return filter_0_100;
            case 1:
                return filter_100_1935;
            case 2:
                return filter_1935_4515;
            case 3:
                return filter_4515_9675;
            case 4:
                return filter_9675_;
            default:
                return [];
        }
    };

    const getGainForBand = (index) => {
        switch (index) {
            case 0:
                return gain1;
            case 1:
                return gain2;
            case 2:
                return gain3;
            case 3:
                return gain4;
            case 4:
                return gain5;
            default:
                return 0;
        }
    };
    
    return null;
}

export default Processer;