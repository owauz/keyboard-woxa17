import { useState } from 'react';
import axios from 'axios';
import './Search.scss';

export default function Search() {
    const [query, setQuery] = useState('');
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);
    
    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
            setWordData(res.data[0]);
            setError(null);
        } catch (err) {
            setWordData(null);
            if (err.response && err.response.status === 404) {
                setError('Word not found.');
            } else {
                setError('Something went wrong. Try again.');
            }
        }
    };

    return (
        <div className="search">
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="..." fill="#A445ED" />
                    </svg>
                </button>
            </div>

            {error && <div className="error">{error}</div>}

            {wordData && (
                <div className="definition">
                    <h1>{wordData.word}</h1>
                    {wordData.phonetic && <span>/{wordData.phonetic}/</span>}

                    {wordData.phonetics && wordData.phonetics.map((p, i) => (
                        <div key={i} className="phonetic">
                            {p.audio && (
                                <audio controls>
                                    <source src={p.audio} type="audio/mp3" />
                                </audio>
                            )}
                        </div>
                    ))}

                    {wordData.origin && (
                        <div className="origin">
                            <strong>Origin:</strong> {wordData.origin}
                        </div>
                    )}

                    {wordData.meanings.map((meaning, idx) => (
                        <div key={idx}>
                            <div className="part-of-speech">{meaning.partOfSpeech}</div>
                            <div className="meaning">
                                <ul>
                                    {meaning.definitions.map((def, i) => (
                                        <li key={i}>
                                            {def.definition}
                                            {def.example && (
                                                <div className="example">"{def.example}"</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                    <p>Source <a href={wordData.sourceUrls[0]} target="_blank" >https://en.wiktionary.org/wiki/keyboard</a> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.09091 4.29545C6.50512 4.29545 6.84091 3.95967 6.84091 3.54545C6.84091 3.13124 6.50512 2.79545 6.09091 2.79545V4.29545ZM1.42603 3.97148L1.95635 4.50182L1.95637 4.50181L1.42603 3.97148ZM1.42603 12.574L1.95638 12.0437L1.95637 12.0436L1.42603 12.574ZM11.2045 7.90909C11.2045 7.49488 10.8688 7.15909 10.4545 7.15909C10.0403 7.15909 9.70455 7.49488 9.70455 7.90909H11.2045ZM4.83331 8.10603C4.54041 8.39893 4.54041 8.8738 4.83331 9.16669C5.1262 9.45959 5.60107 9.45959 5.89397 9.16669L4.83331 8.10603ZM13.1667 1.89397C13.4596 1.60107 13.4596 1.1262 13.1667 0.833306C12.8738 0.540413 12.3989 0.540413 12.106 0.833306L13.1667 1.89397ZM12.6364 2.11364C13.0506 2.11364 13.3864 1.77785 13.3864 1.36364C13.3864 0.949423 13.0506 0.613636 12.6364 0.613636V2.11364ZM9 0.613636C8.58579 0.613636 8.25 0.949423 8.25 1.36364C8.25 1.77785 8.58579 2.11364 9 2.11364V0.613636ZM13.3864 1.36364C13.3864 0.949423 13.0506 0.613636 12.6364 0.613636C12.2221 0.613636 11.8864 0.949423 11.8864 1.36364H13.3864ZM11.8864 5C11.8864 5.41421 12.2221 5.75 12.6364 5.75C13.0506 5.75 13.3864 5.41421 13.3864 5H11.8864ZM6.09091 2.79545H2.45455V4.29545H6.09091V2.79545ZM2.45455 2.79545C1.86987 2.79545 1.30913 3.02771 0.895692 3.44116L1.95637 4.50181C2.08849 4.36968 2.26769 4.29545 2.45455 4.29545V2.79545ZM0.895706 3.44115C0.482259 3.85458 0.25 4.41532 0.25 5H1.75C1.75 4.81314 1.82423 4.63394 1.95635 4.50182L0.895706 3.44115ZM0.25 5V11.5455H1.75V5H0.25ZM0.25 11.5455C0.25 12.1301 0.482269 12.6908 0.895685 13.1043L1.95637 12.0436C1.82422 11.9115 1.75 11.7323 1.75 11.5455H0.25ZM0.895678 13.1043C1.30913 13.5178 1.86988 13.75 2.45455 13.75V12.25C2.26768 12.25 2.08849 12.1758 1.95638 12.0437L0.895678 13.1043ZM2.45455 13.75H9V12.25H2.45455V13.75ZM9 13.75C9.58466 13.75 10.1454 13.5177 10.5588 13.1043L9.49818 12.0436C9.36603 12.1758 9.18683 12.25 9 12.25V13.75ZM10.5588 13.1043C10.9723 12.6908 11.2045 12.1301 11.2045 11.5455H9.70455C9.70455 11.7323 9.63033 11.9115 9.49818 12.0436L10.5588 13.1043ZM11.2045 11.5455V7.90909H9.70455V11.5455H11.2045ZM5.89397 9.16669L13.1667 1.89397L12.106 0.833306L4.83331 8.10603L5.89397 9.16669ZM12.6364 0.613636H9V2.11364H12.6364V0.613636ZM11.8864 1.36364V5H13.3864V1.36364H11.8864Z" fill="#757575" />
                    </svg>
                    </p>
                </div>
            )}
        </div>
    );
}
