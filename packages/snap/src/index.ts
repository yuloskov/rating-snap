import { OnTransactionHandler } from '@metamask/snaps-types';
import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { isObject } from '@metamask/utils';

const SCORE_API_URL = 'https://score-api.sgmakarov.ru';
// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  if (!isObject(transaction)) {
    console.warn('Unknown transaction type.');
    return { content: text('Unknown transaction') };
  }
  const { to } = transaction;

  let score = 0;
  let apiError = null;

  try {
    const response = await fetch(`${SCORE_API_URL}/rating/${to}`);

    if (response.status !== 200) {
      apiError = 'Failed to fetch rating';
      throw new Error('Failed to fetch rating');
    }

    const data = await response.json();
    score = data.rating;
    console.log(data);
  } catch (error) {
    console.error(error);
    apiError = error.message;
  }

  // Display percentage of gas fees in the transaction insights UI.
  return {
    content: panel([
      heading('Score snap'),
      text(`You are trying to interact with **${to}** address.`),
      divider(),
      apiError
        ? text(`Error: ${apiError}`)
        : text(`The score of this wallet is: ${score.toFixed(2)}`),
    ]),
  };
};
