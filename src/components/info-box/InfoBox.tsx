import { useEffect, useState } from 'react';
import './info-box.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

export default function InfoBox({}: any) {
  const numBounces = useSelector((state: RootState) => state.numBounces.value);
  

  useEffect(() => {});

  return (
    <section className='info-box'>
      <table>
        <thead>
          <tr>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bounces</td>
            <td>{numBounces}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
