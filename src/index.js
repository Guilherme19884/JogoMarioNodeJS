const Player1 = {   
    NOME: 'Mario',
    VELOCIDADE:  4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const Player2 = {   
    NOME: 'Pench',
    VELOCIDADE:  3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
}

const Player3 = {   
    NOME: 'Yoshi',
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
}

const Player4 = {   
    NOME: 'Bowser',
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
}

const Player5 = {   
    NOME: 'Luigi',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

const Player6 = {   
    NOME: 'Donkey kong',
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
}

async function rollDice(){
    return Math.floor(Math.random()*6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;

        case random < 0.66:
            result = 'CURVA'
            break;
        
        default:
            result = 'CONFRONTRO'
    }
    return result
}

async function logRollResult(charaterName, block, diceResult, attribute){

    console.log(`${charaterName} 🎲  rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

    //Definir os blocos
      let block =  await getRandomBlock()
      console.log(`Bloco: ${block}`)

    //rolar dados
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    //teste de habilidade
    let totalTesteSkill1 = 0
    let totalTesteSkill2 = 0

        if(block === 'RETA'){
            totalTesteSkill1 = diceResult1 + character1.VELOCIDADE
            totalTesteSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(character1.NOME, 
                'Velocidade', 
                diceResult1,
            character1.VELOCIDADE)

            await logRollResult(character2.NOME, 
                'Velocidade', 
                diceResult2,
            character2.VELOCIDADE)
        }

        if(block === 'CURVA'){
            totalTesteSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTesteSkill2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(character1.NOME, 
                'Manobrabilidade', 
                diceResult1,
            character1.MANOBRABILIDADE)

            await logRollResult(character2.NOME, 
                'Manobrabilidade', 
                diceResult2,
            character2.MANOBRABILIDADE)
        }
        if(block === 'CONFRONTRO'){
            let totalPowerresult1 = diceResult1 + character1.PODER
            let totalPowerresult2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 
            🥊`)

            await logRollResult(character1.NOME, 
                'Poder', 
                diceResult1,
            character1.PODER)

            await logRollResult(character2.NOME, 
                'Poder', 
                diceResult2,
            character2.PODER)
            
            
            if(totalPowerresult1 > totalPowerresult2 && character2.PONTOS > 0 ){
                console.log(`${character1.NOME} venceu o confontro! 
                ${character2.NOME} perdeu 1 ponto 🐢`)
                character2.PONTOS --
                }
 
             
            if(totalPowerresult2 > totalPowerresult1 && character1.PONTOS > 0 ){
                console.log(`${character2.NOME} venceu o confontro! 
                ${character1.NOME} perdeu 1 ponto 🐢`)

                character1.PONTOS --
            }
           
            console.log (totalPowerresult1 === totalPowerresult2 ?
                 'Confronto empatado! Nenhum ponto foi perdido!' : '')
                  console.log('_____________________________')
        }

        //verificando o vencedor
        if (block === 'RETA' || block === 'CURVA') {
            if (totalTesteSkill1 > totalTesteSkill2) {
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTesteSkill1 < totalTesteSkill2) {
                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            } else {
                console.log(`Empate na ${block}, ninguém marcou ponto!`);
            }
            console.log('_____________________________');
        }
        
    }

}

async function declareWinner(character1, character2){
    console.log('Resultado Final:')
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`${character1.NOME} is Winner!`)
    }else if(character1.PONTOS < character2.PONTOS){
        console.log(`${character2.NOME} is Winner!`)
    }else{
        console.log(`Joguem outram vez, deu empate!`)
    }
}

(async function main (){
        console.log(
            `🚦🏁🚦 Corrida entre ${Player1.NOME} e ${Player2.NOME} começando ...\n`)

    await playRaceEngine(Player1, Player2) 
    await declareWinner(Player1,Player2)
    
})()
