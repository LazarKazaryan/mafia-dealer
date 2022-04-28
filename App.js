import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Counter from './components/Counter';

export default function App() {
  const [gamers, setGamers] = useState(['Քաղաքացի/Կարմիր', 'Քաղաքացի/Կարմիր', 'Մաֆիա/Սև'])
  const [mafiaCount, setMafiaCount] = useState(1)
  const [civilianCount, setCivilianCount] = useState(2)
  const [gameStarted, setGameStarted] = useState(false)
  const [drawEnded, setDrawEnded] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(1)
  const [playerShowed, setPlayerShowed] = useState(false)
  const shuffleArray = (array) => {
    for (let i = 0; i < array.length; i++) {
      let randomIdx = Math.floor(Math.random() * array.length)
      let currentItem = array[i]
      let randomItem = array[randomIdx]
      array[i] = randomItem
      array[randomIdx] = currentItem
    }
    return array
  }

  const startGameHandler = () => {
    if (mafiaCount < civilianCount) {
      setGameStarted(true)
      let gamersWithDonAndSherif = gamers
      gamersWithDonAndSherif[gamers.indexOf('Մաֆիա/Սև')] = 'Դոն/Սև'
      gamersWithDonAndSherif[gamers.indexOf('Քաղաքացի/Կարմիր')] = 'Շերիֆ/Կարմիր'
      setGamers(shuffleArray(shuffleArray(gamersWithDonAndSherif)))
    } else {
      alert('Մաֆիաների/Սևերի քանակը չպետք է գերազանցի քաղաքացիների/կարմիրների քանակը')
    }
  }

  const showPlayer = () => {
    if (currentPlayerIdx <= gamers.length && !playerShowed) {
      setCurrentPlayer(gamers[currentPlayerIdx - 1])
      setPlayerShowed(true)
    }
  }
  const hidePlayer = () => {
    if (currentPlayerIdx < gamers.length && playerShowed) {
      setCurrentPlayerIdx(currentPlayerIdx + 1)
      setCurrentPlayer('')
      setPlayerShowed(false)
    } else {
      setDrawEnded(true)
    }
  }

  const mafiaCountAdd = count => {
    setMafiaCount(count)
    setGamers([...gamers, 'Մաֆիա/Սև'])
  }
  const civilianCountAdd = count => {
    setCivilianCount(count)
    setGamers([...gamers, 'Քաղաքացի/Կարմիր'])
  }
  const mafiaCountRemove = count => {
    if (count >= 1) {
      setMafiaCount(count)
      setGamers(gamers.filter((g, idx) => idx !== gamers.lastIndexOf('Մաֆիա/Սև')))
    }
  }
  const civilianCountRemove = count => {
    if (count >= 2) {
      setCivilianCount(count)
      setGamers(gamers.filter((g, idx) => idx !== gamers.lastIndexOf('Քաղաքացի/Կարմիր')))
    }
  }

  return (
    <View style={styles.container}>
      {!drawEnded
        ? !gameStarted
          ? <View style={styles.players_setting}>
            <Counter titleColor='#a1c959' title='Քաղաքացի/Կարմիր' count={civilianCount} increment={civilianCountAdd} decrement={civilianCountRemove} />
            <Counter titleColor='#B33030' title='Մաֆիա/Սև' count={mafiaCount} increment={mafiaCountAdd} decrement={mafiaCountRemove} />
            <TouchableOpacity activeOpacity={0.8} style={styles.gameBtn} onPress={startGameHandler}>
              <Text style={styles.gameBtnContent}>Խաղալ</Text>
            </TouchableOpacity>
          </View >
          : <View style={styles.player_draw}>
            <Text style={styles.gamePlayer}>Խաղացող {currentPlayerIdx}</Text>
            <Text style={styles.gamePlayer}>{currentPlayer}</Text>
            {!playerShowed
              ?
              <TouchableOpacity activeOpacity={0.8} style={styles.gameBtn} onPress={showPlayer}>
                <Text style={styles.gameBtnContent}>Բացել</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity activeOpacity={0.8} style={styles.gameBtn} onPress={hidePlayer}>
                <Text style={styles.gameBtnContent}>Փակել</Text>
              </TouchableOpacity>
            }
            <StatusBar style='auto' />

          </View>
        : <View style={styles.player_role_box}>
          {gamers.map((g,idx) => 
            <Text style={styles.player_role} key={idx}>{idx + 1}. {g}</Text>  
          )}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111e24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  players_setting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  player_draw: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  gameBtn: {
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'green',
    maxWidth: 150,
    overflow: 'hidden',
    borderRadius: 15,
    textAlign: 'center'
  },
  gameBtnContent: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  gamePlayer: {
    textAlign: 'center',
    fontSize: 22,
    color: '#ffffff',
    marginBottom: 50
  },
  player_role_box:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  player_role:{
    color:'#ffffff',
    fontSize:19,
    marginVertical:15
  }
});
