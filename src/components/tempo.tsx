import React, { useEffect, useState } from 'react';
import { TempoContainer } from './tempo.styles';

const Tempo = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Atualiza a cada segundo (1000 ms)

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, []);

    return (
        <TempoContainer >
            <h1 className='tempo'>Time: {currentTime.toLocaleTimeString()}</h1>
        </TempoContainer>
    );
};
export default Tempo;