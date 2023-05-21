import { useEffect, useState } from 'react';
import './info-box.scss';

export default function InfoBox({ onBounce }: any) {
  const [numBounces, setNumBounces] = useState<number>(0);

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
