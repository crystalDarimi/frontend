import React,{useState} from "react";
import {Container, Grid, Typography, TextField, Button,Link }  from "@mui/material";
import {signup} from "../service/ApiService";
import '../styles/Signup.css';
import {isChecked} from 'react';

const Signup = () =>{
    const handleSubmit = (event) =>{
        event.preventDefault(); //오브젝트에서 form에 저장된 데이터를 앱의 형태로 바꿔줌
        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const role = data.get("role");
        signup({email:email,username:username,password:password,role:role}).then(
            (response)=>{
                //회원가입 (계정 생성 성공시 login페이지로 리디렉트)
                window.location.href = "/login";
            }
        );
    };

    const [isChecked, setIsChecked] = useState(false);



    return(
        <Container component= "main" maxWidth="xs" style={{marginTop:"8%"}}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs = {12}>
                        <Typography component= "h1" variant="h5">
                            회원가입
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField
                            autoComplete= "fname"
                            name = "username"
                            variant = "outlined"
                            required
                            fullWidth
                            id = "username"
                            label = "유저 이름"
                            autoFocus />
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField
                            variant = "outlined"
                            required
                            fullWidth
                            id = "email"
                            label = "이메일 주소"
                            name = "email"
                            autoComplete="email"
                            autoFocus />
                    </Grid>
                    {/* <Grid item xs = {4} display="flex">
                        <TextField
                            variant = "outlined"
                            required
                            fullWidth
                            id = "rola1"
                            label = "역할(선생)"
                            name = "role1"
                            autoComplete="role"
                            type="checkbox"
                            autoFocus />
                        <TextField
                            variant = "outlined"
                            required
                            fullWidth
                            id = "rola2"
                            label = "역할(학생)"
                            name = "role2"
                            autoComplete="role"
                            type="checkbox"
                            autoFocus />
                    </Grid> */}
                    {/* <div>
                        <h1>{isChecked ? setIsChecked(true) : setIsChecked(false)}</h1>
                        <input name='teacher'type='checkbox' />
                    </div> */}
                    {/* <div>
                        <h1>{isChecked ? setIsChecked(true) : setIsChecked(false)}</h1>
                        <input name='student'type='checkbox' />
                    </div> */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs = {12}>
                        <Button type = "submit" fullWidth variant="contained" color="primary">
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify = "flex-end">
                    <Grid item>
                        <Link href = "/login" variant = "body2">
                            이미 eple 의 회원이신가요? 로그인 하세요
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Signup;


