import {PaginationProps} from 'src/common/types/pagination.types';
import {MSSQL_CHUNK_SIZE} from "../common/constants/constant.index";

export const getPaginationSortParams = ({
  pagination,
  page,
  size,
  sort,
  order,
}: PaginationProps) => {
  const generate = (
    obj: object,
    keys: string[],
    index: number,
    order: string,
  ) => {
    if (index === keys.length - 1) {
      obj[keys[index]] = order;
      return;
    }

    obj[keys[index]] = {};

    generate(obj[keys[index]], keys, index + 1, order);
  };

  let sortOrder = {};

  const nestedSort = sort?.split('.');

  if (nestedSort?.length === 1) {
    sortOrder = {
      [sort]: order,
    };
  }

  if (nestedSort?.length > 1) {
    generate(sortOrder, nestedSort, 0, order);
  }

  return {
    skip: pagination ? (page - 1) * size : undefined,
    take: pagination ? size : undefined,
    order: sortOrder,
  };
};

export const calculateChunkSize = (data: object[]): number => {
  if (data.length === 0) {
    return 1;
  }
  let maxKeys = 0;

  for (const obj of data) {
    const keysCount = getTotalKeysRecursive(obj);
    maxKeys = Math.max(maxKeys, keysCount);
  }

  return Math.floor(MSSQL_CHUNK_SIZE / maxKeys);
};

function getTotalKeysRecursive(obj: any = []): number {
  let totalKeys = Object.keys(obj).length;

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      totalKeys += getTotalKeysRecursive(obj[key]);
    }
  }

  return totalKeys;
}

export const toRomanNepali = (
  num: number,
): { roman: string; nepali: string } => {
  const data = {
    1: {
      roman: 'I',
      nepali: 'पहिलो',
    },
    2: {
      roman: 'II',
      nepali: 'दोस्रो',
    },
    3: {
      roman: 'III',
      nepali: 'तेस्रो',
    },
    4: {
      roman: 'IV',
      nepali: 'चौथो',
    },
    5: {
      roman: 'V',
      nepali: 'पाँचौ',
    },
    6: {
      roman: 'VI',
      nepali: 'छैटौं',
    },
    7: {
      roman: 'VII',
      nepali: 'सातौं',
    },
    8: {
      roman: 'VIII',
      nepali: 'आठौं',
    },
    9: {
      roman: 'IX',
      nepali: 'नवौं',
    },
    10: {
      roman: 'X',
      nepali: 'दशौं',
    },
  };

  return data[num];
};
