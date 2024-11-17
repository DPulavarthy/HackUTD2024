import { useEffect, useState } from 'react';
import '../styles/Speech.css';

export default () => {

    const [objectId, setObjectId] = useState(null);

    const [percent, setPercent] = useState(0);
    const [freelancers, setFreelancers] = useState([]);


    const [start, setStart] = useState(false);
    const [counterId, setCounter] = useState(null);
    const [transcript, setTranscript] = useState('<i>Listening...</i>');
    const [job, setJob] = useState(false);
    let final = ''

    const { webkitSpeechRecognition } = window;
    const recognition = new webkitSpeechRecognition();
    let keywords = ['Python', 'Java', 'SQL', 'Machine Learning', 'Data Science', 'Cloud Computing', 'Docker', 'Kubernetes', 'AWS', 'Flask', 'Django', 'JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Artificial Intelligence', 'Blockchain', 'Solidity', 'Neural Networks', 'Mobile App Development', 'Android', 'iOS', 'UX/UI Design', 'R', 'DevOps'].map((word) => word.toLowerCase())

    let once = false
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        console.log('Listening...');
        setStart(true)
    };

    async function runE2() {
        setJob(true);
        const list = []
        document.getElementById('transcript')?.innerHTML.match(/\<b\>.*?\<\/b\>/g)?.forEach((word) => {
            return list.includes(word.trim().slice(3, -4)) ? null : list.push(word.trim().slice(3, -4).replace(/\.|,|!|\?/g, ''))
        })

    }

    recognition.onresult = function (event) {


        let interim_transcript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final += event.results[i][0].transcript;
                final = final.replace(/\.(?=[A-z]{1})/g, '. ').split(' ').map((word) => keywords.includes((word.toLowerCase().match(/[A-z]*/g))?.[0]) ? `<b>${word}</b>` : word).join(' ');
            } else {
                interim_transcript += event.results[i][0].transcript;
                interim_transcript = interim_transcript.replace(/\.(?=[A-z]{1})/g, '. ').split(' ').map((word) => keywords.includes((word.toLowerCase().match(/[A-z]*/g))?.[0]) ? `<b>${word}</b>` : word).join(' ');
            }
        }

        if (document.getElementById('transcript')) setTranscript(`${final} ${interim_transcript}`)
    };

    recognition.onend = function () {
        console.log('Stopped listening');
    };



    window.onkeyup = (e) => {
        if (e.key === 'Escape' && job) {
            setJob(false)
        }
    }

    return (<>
        <div className='viz'>
            <main style={{
                WebkitBackdropFilter: 'blur(10px)',
                color: '#fefefe',
                height: 'calc(100vh - 250px)',
                borderRadius: '10px',
                outline: '3px solid rgba(255, 255, 255, 1)',
                backdropFilter: 'blur(10px)',
                flexDirection: 'column',
                display: start ? 'block' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className="speech">
                    <div className="start woopie"
                        data-text={start ? 'Press me to stop recording' : 'Press me to start recording'}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            position: 'absolute',
                            padding: '10px',
                            background: start ? 'rgba(67, 181, 129, 1)' : 'rgba(255, 255, 255, 0.5)',
                            boxShadow: start ? 'none' : '3px 3px 20px 3px rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(10px)',
                            outline: start ? '6px solid rgba(255, 255, 255, 1)' : '4px solid rgba(255, 255, 255, 1)',
                            transform: start ? 'scale(0.5) translate(-50%, -50%)' : 'translate(-50%, -50%)',
                            top: start ? 'calc(100% - 30px)' : '50%',
                            left: 'calc(50% - 10px)',
                        }}
                        onClick={(e) => {
                            if (start) {
                                setStart(false)
                                runE2()
                            }
                            recognition[!start ? 'start' : 'stop']();
                        }}>
                        <img src="./mic.png" alt="mic" style={{
                            filter: start ? 'invert(1)' : 'invert(0)',
                        }} />
                    </div>
                    {/* <p id="transcript" dangerouslySetInnerHTML={{ __html: transcript }}></p> */}
                    {start && <p id="transcript" dangerouslySetInnerHTML={{ __html: transcript }}></p>}
                    {/* <p style={{ display: start ? 'block' : 'none' }}></p> */}
                </div>
            </main>
        </div>
    </>);
}
