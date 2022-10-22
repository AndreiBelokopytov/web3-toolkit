import React, { memo } from 'react';
import { BigNumber, BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { assert } from 'console';

const DEFAULT_UNITS = 18;

type Props = {
  value: BigNumber;
  units?: BigNumberish;
  fractionDigits?: number;
};

export const Balance = memo(
  ({ value, units = DEFAULT_UNITS, fractionDigits }: Props) => {
    assert(
      fractionDigits === undefined ||
        (fractionDigits > 0 && fractionDigits < units)
    );
    let formattedValue = formatUnits(value, units);
    const fraction = formattedValue.split('.')[1];
    if (fractionDigits && fraction.length > fractionDigits) {
      formattedValue = formattedValue.slice(
        0,
        formattedValue.length - fraction.length + fractionDigits
      );
    }
    return <span>{formattedValue}</span>;
  }
);
