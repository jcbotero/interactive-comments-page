'use client' // next por default trabaja desde el lado del servidor y asi no me deja usar usestate... por eso con esta linea trabajo desde el lado del client

import styles from './page.module.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {items} from './data.json'


export default function Home() {


  const [ comentarios , setComentario] = useState() 
  const [ NewComentarios , setNewComentario] = useState()
  const [ replica, setReplica] = useState()
  const [ newReplica, setNewreplica ] = useState();
  const [ nuevaR, setnuevaR ] = useState();
  
  const [ arrayReplicas, setArrayreplicas] = useState();
 const [ arrayIndex , setArrayindex] = useState()

  
  const {comments} = items; // tengo que traer es una array si quiero hacerle .map , en este caso esta nested dentro del object items
  const {replies} = items;
 
  
  

useEffect(() => {
 
setComentario( comments)
setReplica(replies)
setNewComentario({
  id: 8,
  content: "hola",
  createdAt : Date(), // este Date() me le da la fecha actual al comentario que ponga
  score: 0,
  user: {
    image: { 
      png : "./image-juliusomo.png",   
    },
    username: "juliusomo"
}})

}) //dentro de useffect para que me actualice la const comments





// section nuuevos comentarios


const comContent = useRef()

let comReplica = useRef()
let editReplica = useRef()
const comReplica2 = useRef()
const userReply = useRef() 
const scorebtn = useRef()



let publish = () => {

  comments.push({
      id: 1,
      content: comContent.current.value,
      createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
      score: 0,
      user: {
        image: { 
          png : "./image-juliusomo.png",   
        },
        username: "juliusomo"
   }}) // con el .push ingreso este object dentro de la array comments, para así me lo renderice tbn cada vez que escribo un nuevo comentario
  
}

let show = () => {
  document.getElementById("replicas").style.display = "none"
}

let edit = () => {   
    document.getElementById("update").style.display = "flex"
    document.getElementById("reply").style.display = "none"  
}


let update = () => {    
  document.getElementById("update").style.display = "none"
  document.getElementById("reply").style.display = "flex"
}

// section incremento/decremento de numero con botones

const [ incremento , setIncremento] = useState()
const [ sumOne , setsumOne] = useState()



const increment = () => {
  document.getElementById("score").style.display = "none"
}
   

// mirar ultimo fav.. creo tiene la respuesta

  return (
    <main className={styles.main}>
        <section className={styles.MainComments}>
        {comentarios?.map( (comentarios, index, btn ) =>
                <div id='index'  key={index} onClick={() =>  setNewreplica(index)  } > {/* asi puedo rendirzar un nuevo div al darle click a un elemento mapeado, dentro de un usestate paso el index del div, para que me agarre solo ese div, y abajo en el  index === newReplica ? , hago el renderizado */}
                  <article className={styles.comentariosSti}>
                    <div  key={btn} className={styles.buttonScore}>                                                          {/* si quiero que me borre el div al darle click a otro elemento mapeado debo poner asi  = onClick={() => newReplica === index ? setnewReplica(undefined) : setListIndex(index)} */}           
                          <button  className={styles.plus}  onClick={ () => { 
                            setIncremento(index)
                          
                          }} >+</button>
                            { (() => {   if ( index === incremento) {
                                scorebtn.current.value =  4

                            } else { }
         
                             })()}  {/* este conditional sale del usestate que toma el index del div al darle click... y me suma 1 al score de ese div , mostrando un nuevo input*/}
                           
                         
                          <h2 id='score' ref={scorebtn} >{ comentarios.score}</h2>
                          <button className={styles.minus}>-</button>
                    </div> 
                    <div>  
                             <div className={styles.comentariosTop}>
                                  <div className={styles.comentariosTop1}>
                                        <img src={comentarios.user.image.png} />
                                        <h4>{comentarios.user.username}</h4>
                                        <h4 className={styles.fecha}>{comentarios.createdAt}</h4>
                                  </div>
                      
                                        { (() => {   if ( comentarios.user.username === "juliusomo" ) { {/* asi coloco un if dentro del jsx.. no olvidar los () al incio y al final... como si fuera una function,  estoy condiconando que se renderice si la el la propieda del object no es igual a "juliosomo*/}
                                  return (   
                                  <div className={styles.comentariosTop2}>                          
                                                <button className={styles.editBtn} onClick={ () => {
                                                  comments.pop({
                                                    id: 1,
                                                    content: comContent.current.value,
                                                    createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
                                                    score: 0,
                                                    user: {
                                                      image: { 
                                                        png : "./image-juliusomo.png",   
                                                      },
                                                      username: "juliusomo"
                                                }}) 
                                              editNewC }
                                              }  >edit</button>
                                              <button className={styles.deleteBtn} onClick={ () => {
                                                comments.pop({
                                                  id: 1,
                                                  content: comContent.current.value,
                                                  createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
                                                  score: 0,
                                                  user: {
                                                    image: { 
                                                      png : "./image-juliusomo.png",   
                                                    },
                                                    username: "juliusomo"
                                              }}) 
                                              } } 
                                              >delete</button> {/* el .pop me saca de la array el ultimo elemento  */}   
                                        </div>
                                      )
                                      }})()}
                                       { (() => {   if ( comentarios.user.username !== "juliusomo" ) { {/* asi coloco un if dentro del jsx.. no olvidar los () al incio y al final... como si fuera una function,  estoy condiconando que se renderice si la el la propieda del object no es igual a "juliosomo*/}
                                  return (                                   
                                          <button className={styles.replyBtn}>Reply</button>
                                      )
                                      }})()}
          
                                                                   
                         </div>
                          <p >{comentarios.content}</p>

                     </div>  {/* aqui complemento el onclickm, me dice que si el index del div es igual al hook newReplica, y luego me renderiza el div  */}    
                     </article>
                     { index === newReplica ? 
                     <div> 
                     { (() => { 
                    if ( comentarios.user.username !== "juliusomo" ) {
                      return(
                      <div id='replicas' className={styles.PublishBtn}>
                         <img src='./image-juliusomo.png'></img>
                         <textarea ref={comReplica} placeholder={ "@" + comentarios.user.username}  ></textarea>
                         <button onClick={() => {  
                          
                                  comentarios.replies.push({  
                                                      id: 10,
                                                      content:  comReplica.current.value,
                                                      createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
                                                      score: 0,
                                                      user: {
                                                        image: { 
                                                          png : "./image-juliusomo.png",   
                                                        },
                                                        username: "juliusomo"
                                                    }})
                                                  show()
                                                                               
                                                  }}>REPLY</button> {/* aqui estoy poniendo un .push directamente en el jsx... mas facil pues agarro los hooks actulizados */}
                      </div> 
                      )                    
                   }})()} 
                    </div> : true 
                  }
                  
                     <div className={styles.ReplyComments}>
                         { (() => {  
                          if (comentarios.replies?.length > 0) { 
                          return( 
                          <div>
                           {comentarios.replies.map((replies, id) => (                    
                             <ul key={id} >
                               <section id='reply' className={styles.comentariosSti}>      
                                 <div className={styles.buttonScore}>
                                     <button className={styles.plus}>+</button>
                                     <h2>{replies.score}</h2>
                                     <button className={styles.minus}>-</button> 
                                 </div>
                                 <div>
                                      <div>
                                          <div className={styles.comentariosTop} id={styles.replicaC}>
                                         
                                                    <div>
                                                      <img src={replies.user.image.png} />
                                                      <h4 ref={userReply}>{replies.user.username}</h4>
                                                      { (() => {  
                                                    if ( replies.user.username === "juliusomo" ) {
                                                      return (
                                                         <div>
                                                          <p id={styles.you}>you</p>
                                                         </div> 
                                                        )
                                                    }})()}                                             
                                                      <h4 className={styles.fecha}>{replies.createdAt}</h4>
                                                    </div>
                                             
                                                { (() => {  
                                              if ( replies?.user.username == "juliusomo" ) {
                                                return (
                                                 <div id={styles.modify}>
                                                          <button id={styles.delete} onClick={ () => {
                                                          comentarios.replies.pop({  
                                                            id: 10,
                                                            content: comReplica.current.value,
                                                            createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
                                                            score: 0,
                                                            user: {
                                                              image: { 
                                                                png : "./image-juliusomo.png",   
                                                              },
                                                              username: "juliusomo"
                                                          }})
                                                          }}>Delete</button>
                                                          <button id={styles.edit} onClick={ 
                                                          edit
              
                                                          }
                                                        >Edit</button>
                                                  </div>

                                                  )
                                              }})()} {/* asi coloco un if dentro del jsx.. no olvidar los () al incio y al final... como si fuera una function,  estoy condiconando que se renderice si la array replies tiene al menos un elemento*/}
                                            
                                              { (() => {  
                                                if ( replies?.user.username !== "juliusomo" ) {
                                                return (
                                               
                                                <div className={styles.comentariosTop2}>
                                                   <button className={styles.replyBtn}>Reply</button>
                                                </div>
                                                )
                                              }})()} 
                                          </div>
                                
                                      </div>
                                      <div>
                                          <p> <span className={styles.span} >{ "@" + comentarios.user.username }</span> {replies.content}</p>
                                      </div>                               
                                   </div>                                                     
                             </section>
                            <section id='update'  className={styles.nuevasRep} >                      
                                <div className={styles.buttonScore} >
                                    <button className={styles.plus}>+</button>
                                    <h2>0</h2>
                                    <button className={styles.minus}>-</button> 
                                </div>
                                <div className={styles.comentariosUp}>
                                    <div  className={styles.comentariosTop}>
                                            <div className={styles.comentariosTopR}>
                                                <img src="./image-juliusomo.png"></img>
                                                <h4 ref={userReply}>{replies.user.username}</h4>
                                                <h4 id={styles.you}>you</h4>
                                            </div> 
                                            <div id={styles.dele}>
                                                <button id={styles.delete} >Delete</button>    
                                            </div>  
                                    </div>
                                    <div className={styles.textareaUpdate}>
                                          <textarea ref={editReplica} placeholder={replies.content}></textarea>
                                    </div>
                                    <div className={styles.updateBtndiv}>
                                          <button onClick=
                                          { () => {  
                                            comentarios.replies.pop({  
                                              id: 10,
                                              content: comReplica.current.value,
                                              createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
                                              score: 0,
                                              user: {
                                                image: { 
                                                  png : "./image-juliusomo.png",   
                                                },
                                                username: "juliusomo"
                                            }})
                                            comentarios.replies.push({  
                                              id: 7,
                                              content: editReplica.current.value,
                                              createdAt : new Date().toISOString().slice(0, 10), // este Date() me le da la fecha actual al comentario que ponga
                                              score: 0,
                                              user: {
                                                image: { 
                                                  png : "./image-juliusomo.png",   
                                                },
                                                username: "juliusomo"
                                            }})
                                            update()   
                                          }}  className={styles.updateBtn}>UPDATE</button>
                                    </div>
                                </div>                                      
                              </section> 
                             </ul> 
                           ))}
                          </div>
                          )
                          }})()
                        }
                     </div>
                </div>              
                 )}                
        </section>
        <section className={styles.PublishBtn}>
             <img src='./image-juliusomo.png'></img>
             <textarea placeholder='Add a comment...'  ref={comContent}></textarea>
             <button onClick={publish}>SEND</button>
        </section>
        <section>
              
        </section>
        
    </main>
  )
}
