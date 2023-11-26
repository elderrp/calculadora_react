import React from 'react'
import { useState } from 'react'
import "./Calculadora.css"

const Calculadora = () => {

  const [valorAtual, setValorAtual]= useState("0")
  const [operacaoPendente, setOperacaoPendente]= useState(null)
  const [valorPendente, setValorPendente]= useState(null)
  const [operacaoCompleta, setOperacaoCompleta]= useState("")

  const botoesTeclado = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operacoes = ["+", "-", "*", "/"]

  //manipularClick---> manipular o click
  const manipularClick= (val) => {
    setValorAtual(valorAnterior => {
      if (valorAnterior === "0"){
        return val;
      }else{
        return valorAnterior + val
      }
    });
    setOperacaoCompleta(operacaoAnterior => operacaoAnterior + val);
  };
    //manipularOperacao ---> manipular operação
  const manipularOperacao = (operacoes) =>{
    setOperacaoCompleta(valorAtual + "" + operacoes)
    setOperacaoPendente(operacoes)
    setValorPendente(valorAtual)
    setValorAtual( '0')
  }
    //manipularLimpeza ---> manipular limpeza
  const manipularLimpeza = () => {
    setValorAtual('0')
    // setOperacaoPendente(null)
    // setValorPendente(null)
    setOperacaoCompleta("")
  }
     //handleCalculate---> manipular calculo
const manipularCalculo = ()=>{
  if(!operacaoPendente || !valorPendente) {
    return;
  }
  const num1 = parseFloat(valorPendente)
  const num2 = parseFloat(valorAtual)

let result 

switch (operacaoPendente) {
  case "+":
    result = num1 + num2
    break;

  case "*":
    result = num1 * num2
    break;

  case "-":
    result = num1 - num2
    break;

  case "/":
    if(num2 !== 0){
      result = num1 / num2
    }else{
      setValorAtual("error")
      setOperacaoCompleta("error")
      // setOperacaoPendente(null)
      // setValorPendente(null)
      return
    }
    
    break;

  default:
    break;
}
setOperacaoCompleta(
  valorPendente + 
  "" +
   operacaoPendente +
   "" + 
   valorAtual + 
   "=" + 
   result
   );
   setValorAtual(result.toString());
  //  setOperacaoPendente(null)
  //  setValorAtual(null)
};


  return(
    <div className='calculadora'>
      <div className='completar-operacao'>{operacaoCompleta}</div>
      <div className='display'>{valorAtual}</div>
      <div className='botoes'>
        <button onClick={manipularLimpeza}>AC</button>
        {botoesTeclado.map((num) =>(
          <button key={num} onClick={()=> manipularClick(num)}>{num}</button>
        ))}
        {operacoes.map((operacao)=>(
          <button key={operacao} onClick={() => manipularOperacao(operacao)}>{operacao}
          </button>
        ))}
      
        <div className='div-igual'>
            <button className='botao-igual' onClick={manipularCalculo}> = </button>
        </div>
      </div>
    </div>
  ) 
}

export default Calculadora
