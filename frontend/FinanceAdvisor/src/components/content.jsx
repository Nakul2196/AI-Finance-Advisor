import React from 'react';
import Contentheader from './contentheader';
import "./content.css";
import Card from '../components/Card';
import Financelist from '../components/Financelist';

const Content = () => {
  return (
    <div className="content">
      <Contentheader />
      <Card />
      <Financelist />
    </div>
  );
};

export default Content;