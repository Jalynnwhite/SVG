

const fs = require('fs');
const inquirer = require('inquirer');
const { Canvas } = require('svg-canvas');

import inquirer from 'inquirer';

async function promptUser() {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters for the text:',
            validate: input => input.length <= 3 ? true : 'Please enter up to three characters.'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hex):'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keyword or hex):'
        }
    ]);

    return userInput;
}

async function generateSVG(text, textColor, shape, shapeColor) {
    const canvas = new Canvas(300, 200);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = shapeColor;
    if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(150, 100, 50, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(100, 150);
        ctx.lineTo(200, 150);
        ctx.closePath();
        ctx.fill();
    } else if (shape === 'square') {
        ctx.fillRect(100, 50, 100, 100);
    }

    ctx.fillStyle = textColor;
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 150, 100);

    const svgString = canvas.toSVG();
    fs.writeFileSync('logo.svg', svgString);
}

async function main() {
    const userInput = await promptUser();
    await generateSVG(userInput.text, userInput.textColor, userInput.shape, userInput.shapeColor);
    console.log('Generated logo.svg');
}

main();
