/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  transform: translateY(60px);
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffd700;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
`;

function OrgRewards() {
    const [credit, setCredit] = useState("student")
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get("http://localhost:8000/api/v3/users/user-details",{withCredentials:true})
            const user = res.data?.data;
            setCredit(user?.creditScore);
            
        }
        fetchData()
    },[])
    const getTaxRebateMessage = (credit) => {
        if (credit >= 30) {
          return "Congratulations! Based on your excellent credit score, your organization qualifies for the highest tax rebate upto ₹3000. We will get to you soon";
        } else if (credit >= 50) {
          return "Great job! Your organization's credit score qualifies you for a significant tax rebate upto ₹1000";
        } else {
          return 
        }
      };
  return (
    <div style={{transform:"translateY(60px)"}}>
        <Container>
      <Title>Organization Rewards</Title>
      <List>
        <ListItem>{getTaxRebateMessage(credit)}</ListItem>
        <ListItem>
          Promotion on Our Website: We will feature your organization and its green initiatives on our website, providing increased visibility and brand recognition among our audience.
        </ListItem>
      </List>
    </Container>
    </div>
  )
}

export default OrgRewards