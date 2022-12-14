import React, { useState } from "react";
import {Link, Container, Grid, Typography, TextField, Button} from "@mui/material";
import {signin} from "../service/ApiService";




function Login(){
    const [teacher, setTeacher] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        //const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
    

        //apiService의 signin 메서드를 사용해 로그인9
        signin({ email: email, password: password });
    };

    return(
        <Container component= "main" maxWidth= "xs" style={{marginTop:"8%"}}>
            <Grid container spacing={2}>
                <Grid item xs = {12}>
                    <Typography component= "h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                { /* subit 버튼을 누르면 handlesubmit이 실행됨 */}
                <Grid container spacing={2}>
                    <Grid item xs = {12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs = {12}>
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
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            <Grid item>계정이 없습니까? 여기서 가입 하세요.</Grid>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Login;

//mystudent 삭제, 수정 긴ㅇ, (진도 그래프, 프로필)
//aws 데이터 연결


// 회원가입에 선생님 학생 선택 체크박스
//role로 값이 들어감.
//progress차트 캘린더에 연결 - 옆에 뜨게 하기.
