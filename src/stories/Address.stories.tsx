import { ComponentMeta } from '@storybook/react';
import React from 'react';

import { Address } from '../components/Address';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';

export default {
  title: 'Address',
  component: Address
} as ComponentMeta<typeof Address>;

export const Primary = () => (
  <div className='preview'>
    <Address>{ETH_ADDRESS}</Address>
  </div>
);
Primary.storyName = 'Address';
