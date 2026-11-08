import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import userEvent from '@testing-library/user-event';

// Beispieldaten
const testData = {
  type: 'expense',
  amount: '50,00',
  category: 'Lebensmittel',
  note: 'Wocheneinkauf',
  date: '2026-11-08T14:05',
};

describe('TransactionForm', () => {
  it('soll alle Eingabefelder anzeigen', () => {
    render(
      <MemoryRouter>
        <TransactionForm
          initial={testData}
          submitLabel="Buchung speichern"
          loadingLabel="Wird gespeichert..."
          onSubmit={vi.fn()}
          loading={false}
          error={null}
        />
      </MemoryRouter>
    );

    // Eingabefelder überprüfen
    expect(screen.getByLabelText('Betrag (€)')).toBeInTheDocument();
    expect(screen.getByLabelText('Kategorie')).toBeInTheDocument();
    expect(screen.getByLabelText('Datum & Uhrzeit')).toBeInTheDocument();
    expect(screen.getByLabelText('Notiz (optional)')).toBeInTheDocument();

    // Buttons überprüfen
    expect(screen.getByRole('button', { name: 'Ausgabe' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Einnahme' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buchung speichern' })).toBeInTheDocument();
  });


  it('soll die übergebenen Anfangswerte anzeigen', () => {
	  render(
	    <MemoryRouter>
	      <TransactionForm
	        initial={testData}
	        submitLabel="Buchung speichern"
	        loadingLabel="Wird gespeichert..."
	        onSubmit={vi.fn()}
	        loading={false}
	        error={null}
	      />
	    </MemoryRouter>
	  );

	  expect(screen.getByLabelText('Betrag (€)')).toHaveValue('50,00');
	  expect(screen.getByLabelText('Kategorie')).toHaveValue('Lebensmittel');
	  expect(screen.getByLabelText('Datum & Uhrzeit')).toHaveValue('2026-11-08T14:05');
	  expect(screen.getByLabelText('Notiz (optional)')).toHaveValue('Wocheneinkauf');
	});


	it('soll Änderungen in den Eingabefeldern übernehmen', async () => {
	  const user = userEvent.setup();

	  render(
	    <MemoryRouter>
	      <TransactionForm
	        initial={testData}
	        submitLabel="Buchung speichern"
	        loadingLabel="Wird gespeichert..."
	        onSubmit={vi.fn()}
	        loading={false}
	        error={null}
	      />
	    </MemoryRouter>
	  );

	  const amountInput = screen.getByLabelText('Betrag (€)');
	  const categoryInput = screen.getByLabelText('Kategorie');
	  const noteInput = screen.getByLabelText('Notiz (optional)');

	  await user.clear(amountInput);
	  await user.type(amountInput, '75,50');

	  await user.clear(categoryInput);
	  await user.type(categoryInput, 'Miete');

	  await user.clear(noteInput);
	  await user.type(noteInput, 'Monatliche Mietzahlung');

	  expect(amountInput).toHaveValue('75,50');
	  expect(categoryInput).toHaveValue('Miete');
	  expect(noteInput).toHaveValue('Monatliche Mietzahlung');
	});


	it('soll die Buchungsart ändern können', async () => {
	  const user = userEvent.setup();

	  render(
	    <MemoryRouter>
	      <TransactionForm
	        initial={testData}
	        submitLabel="Buchung speichern"
	        loadingLabel="Wird gespeichert..."
	        onSubmit={vi.fn()}
	        loading={false}
	        error={null}
	      />
	    </MemoryRouter>
	  );

	  const expenseButton = screen.getByRole('button', { name: 'Ausgabe' });
	  const incomeButton = screen.getByRole('button', { name: 'Einnahme' });

	  // Anfangszustand: Ausgabe ist ausgewählt
	  expect(expenseButton).toHaveClass('bg-rose-500');
	  expect(incomeButton).not.toHaveClass('bg-emerald-600');

	  // Benutzer wählt Einnahme
	  await user.click(incomeButton);

	  // Neuer Zustand: Einnahme ist ausgewählt
	  expect(incomeButton).toHaveClass('bg-emerald-600');
	  expect(expenseButton).not.toHaveClass('bg-rose-500');
	});


	it('soll die Buchungsdaten korrekt beim Absenden übergeben', async () => {
	  const user = userEvent.setup();
	  const onSubmit = vi.fn();

	  render(
	    <MemoryRouter>
	      <TransactionForm
	        initial={testData}
	        submitLabel="Buchung speichern"
	        loadingLabel="Wird gespeichert..."
	        onSubmit={onSubmit}
	        loading={false}
	        error={null}
	      />
	    </MemoryRouter>
	  );

	  await user.clear(screen.getByLabelText('Betrag (€)'));
	  await user.type(screen.getByLabelText('Betrag (€)'), '75,50');

	  await user.clear(screen.getByLabelText('Kategorie'));
	  await user.type(screen.getByLabelText('Kategorie'), 'Miete');

	  await user.clear(screen.getByLabelText('Notiz (optional)'));
	  await user.type(screen.getByLabelText('Notiz (optional)'), 'Monatliche Mietzahlung');

	  await user.click(screen.getByRole('button', { name: 'Buchung speichern' }));

	  expect(onSubmit).toHaveBeenCalledOnce();

	  expect(onSubmit).toHaveBeenCalledWith({
	    type: 'expense',
	    amount: 75.5,
	    category: 'Miete',
	    note: 'Monatliche Mietzahlung',
	    date: expect.any(String),
	  });
	});
});