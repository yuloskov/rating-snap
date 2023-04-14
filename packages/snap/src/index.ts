import { OnTransactionHandler } from '@metamask/snaps-types';
import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { hasProperty, isObject } from '@metamask/utils';

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  if (!isObject(transaction)) {
    console.warn('Unknown transaction type.');
    return { content: text('Unknown transaction') };
  }
  const { to } = transaction;

  const trustScore = 0.9;
  const launderingRisk = 0.5;
  const botRisk = 0.1;

  // Display percentage of gas fees in the transaction insights UI.
  return {
    content: panel([
      heading('Transaction insights snap'),
      text(`You are trying to interact with **${to}** address.`),
      divider(),
      text(`Trust score: **${trustScore}**`),
      text(`Laundering risk: **${launderingRisk}**`),
      text(`Bot risk: **${botRisk}**`),
    ]),
  };
};
