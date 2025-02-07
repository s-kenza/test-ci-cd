import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('Composant App - Calculatrice', () => {
  test('affiche l\'écran vide initialement', () => {
    render(<App />);
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue('');
  });

  test('met à jour l\'affichage lors des clics sur les boutons', () => {
    render(<App />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("12+3");
  });

  test('calcule correctement une expression valide', () => {
    render(<App />);
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("5");
  });

  test('affiche "Erreur" pour une expression invalide', () => {
    render(<App />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("*"));
    fireEvent.click(screen.getByText("="));
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("Erreur");
  });

  test('efface l\'affichage avec le bouton "C"', () => {
    render(<App />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    // Vérification avant le clear
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("12");
    // Appui sur le bouton "C"
    fireEvent.click(screen.getByText("C"));
    expect(display).toHaveValue("");
  });

  test('supprime le dernier caractère avec le bouton "DEL"', () => {
    render(<App />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("123");
    // Suppression du dernier caractère
    fireEvent.click(screen.getByText("DEL"));
    expect(display).toHaveValue("12");
    fireEvent.click(screen.getByText("DEL"));
    expect(display).toHaveValue("1");
    fireEvent.click(screen.getByText("DEL"));
    expect(display).toHaveValue("");
    // Vérification supplémentaire : appuyer sur DEL quand l'écran est vide
    fireEvent.click(screen.getByText("DEL"));
    expect(display).toHaveValue("");
  });

  test('n\'effectue pas de calcul lorsque l\'expression est vide et "=" est cliqué', () => {
    render(<App />);
    fireEvent.click(screen.getByText("="));
    const display = screen.getByRole('textbox');
    // Ici, on suppose que l'écran reste vide. Selon l'implémentation, cela pourrait être différent.
    expect(display).toHaveValue("");
  });

  test('permet de réinitialiser après une erreur', () => {
    render(<App />);
    // Créer une erreur
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("*"));
    fireEvent.click(screen.getByText("="));
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("Erreur");
    // Réinitialisation avec le bouton "C"
    fireEvent.click(screen.getByText("C"));
    expect(display).toHaveValue("");
  });

  test('calcule correctement une expression avec nombres décimaux', () => {
    render(<App />);
    // Expression : 3.5 + 2.1 = doit afficher "5.6"
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("."));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("."));
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("="));
    const display = screen.getByRole('textbox');
    expect(display).toHaveValue("5.6");
  });
});
