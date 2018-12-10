import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthService{
    token:string;
    constructor(private router:Router){

    }
    signupUser(email:string,password:string){

        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email,password).catch(
            error=> console.log(error)
        )
    }

    signinUser(email:string, password:string,status:string){
        if(status=="admin"){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            response =>{
                this.router.navigate(['/item']);
            firebase.auth().currentUser.getIdToken().then(
                (token: string)=> this.token =token
            )}
        ).catch(
            error => console.log(error)
            
        );
    }
    else if(status=="user"){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            response =>{
                this.router.navigate(['/user']);
            firebase.auth().currentUser.getIdToken().then(
                (token: string)=> this.token =token
            )}
        ).catch(
            error => console.log(error)
            
        );
    }
}

    logout(){
        firebase.auth().signOut();
        this.token=null;
    }
    getToken(){
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string)=> this.token =token
        );
        return this.token;
    }

    isAuthenticated(){
        return this.token != null;
    }
}