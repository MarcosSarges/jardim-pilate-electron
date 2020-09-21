import React, { useEffect, useState } from 'react';
import {
  Container,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Add, ArrowRight } from '@material-ui/icons';
import { differenceInYears, format } from 'date-fns';
import { firestore } from 'firebase';
import Customer from '../../types/customer';
import colors from '../../styles/colors';
import styles from './styles.css';
import { extratorData } from '../../utils/firebaseHelps';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    firestore()
      .collection('customers')
      .get()
      .then((docs) => extratorData(docs, setCustomers))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        <ArrowRight />
        <h3>Clientes</h3>
      </div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Data de cadastro</TableCell>
              <TableCell variant="head">Nome</TableCell>
              <TableCell variant="head">Data de nascimento</TableCell>
              <TableCell variant="head">Idade</TableCell>
              <TableCell variant="head">Ocupação</TableCell>
              <TableCell variant="head">RG</TableCell>
              <TableCell variant="head">CPF</TableCell>
              <TableCell variant="head">Endereço</TableCell>
              <TableCell variant="head">Bairro</TableCell>
              <TableCell variant="head">Email</TableCell>
              <TableCell variant="head">Contato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, i) => {
              const birthdate = customer.birthdate
                ? new Date(customer.birthdate)
                : new Date();

              return (
                <TableRow key={new Date().getTime()}>
                  <TableCell>
                    {format(new Date(customer.createdAt), ' dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{format(birthdate, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    {differenceInYears(new Date(), birthdate)}
                  </TableCell>
                  <TableCell>{customer.occupation}</TableCell>
                  <TableCell>{customer.rg}</TableCell>
                  <TableCell>{customer.cpf}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.neighborhood}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.footer}>
        <Fab style={{ backgroundColor: colors.primary }} aria-label="add">
          <Add htmlColor="#FFF" />
        </Fab>
      </div>
    </Container>
  );
};

export default Customers;
