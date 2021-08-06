import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { SEARCH_CAREER } from './rutas';


export default function Search(career) {

  // function search(){
  //   console.log("Loading...");
  //   const request = async () => {
  //     try {
  //       const res = await axios.get(SEARCH_CAREER,
  //           {
  //             params:{
  //               nombre: 'ing'
  //             }
  //           }
  //       );
  //       console.log(res)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   request();
  // };

  useEffect( () => {
   axios({
     method: 'GET',
     url: SEARCH_CAREER,
     params:{
       nombre: career
     }
   }).then(res => {
     console.log(res.data)
   }).catch((error) => {
       console.log('what')
       console.log(error)
   })
  }, [career]);

    return null
}
