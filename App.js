import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Keyboard, TextInput } from 'react-native';

const MiniGame = () => {
  const [score1, setScore1] = useState(0); // Estado para o placar 1
  const [score2, setScore2] = useState(0); // Estado para o placar 2
  const [time, setTime] = useState(0); // Estado para o tempo
  const [timerOn, setTimerOn] = useState(false); // Estado para controle do cronômetro
  const [gameOver, setGameOver] = useState(false); // Estado para controle do fim do jogo

  // Função para iniciar o cronômetro
  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  // Verificar se o jogo acabou
  useEffect(() => {
    if (time === 50) {
      setGameOver(true);
      setTimerOn(false);
    }
  }, [time]);

  // Função para iniciar ou parar o cronômetro
  const toggleTimer = () => {
    setTimerOn(!timerOn);
  };

  // Função para aumentar pontos do placar 1
  const increaseScore1 = () => {
    if (!gameOver) {
      setScore1(score1 + 1);
    }
  };

  // Função para aumentar pontos do placar 2
  const increaseScore2 = () => {
    if (!gameOver) {
      setScore2(score2 + 1);
    }
  };

  // Função para iniciar ou parar o timer ao pressionar a tecla SPACE
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === ' ') {
      toggleTimer();
    }
  };

  return (
    <View style={styles.container} onKeyPress={handleKeyPress}>
      <Text style={styles.timer}>{time}</Text>
      <Text style={styles.score}>Player 1: {score1}</Text>
      <Text style={styles.score}>Player 2: {score2}</Text>
      {gameOver && <Text style={styles.gameOver}>acabou!</Text>}
      <Button title={timerOn ? 'Parar' : 'Iniciar'} onPress={toggleTimer} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Player 1" onPress={increaseScore1} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Player 2" onPress={increaseScore2} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 30,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
  gameOver: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  buttonWrapper: {
    width: '45%',
  },

});

export default MiniGame;

