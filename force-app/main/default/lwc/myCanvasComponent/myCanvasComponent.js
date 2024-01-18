import { LightningElement } from 'lwc';

export default class BirthdayWishes extends LightningElement {
  connectedCallback() {
    const canvas = this.template.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas width and height to match the container size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Define the circle properties
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 80;

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#cc00cc';
    ctx.fill();
  }
}