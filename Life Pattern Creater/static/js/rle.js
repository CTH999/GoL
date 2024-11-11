function encodeRLE(pattern, config) {
    let rle = '';
    
    // Add configuration parameters
    rle += `#C [[\n`;
    rle += `ZOOM ${config.zoom}\n`;
    rle += `GRID COLOR ${config.gridColor}\n`;
    rle += `GRIDMAJOR ${config.gridMajor}\n`;
    rle += `COLOR GRIDMAJOR ${config.colorGridMajor}\n`;
    rle += `COLOR ALIVE ${config.colorAlive}\n`;
    rle += `COLOR DEAD ${config.colorDead}\n`;
    rle += `COLOR BACKGROUND ${config.colorBackground}\n`;
    rle += `]]\n`;
    
    // RLE header
    rle += `x = ${pattern[0].length}, y = ${pattern.length}\n`;
    
    for (let row = 0; row < pattern.length; row++) {
        let lineRle = '';
        let count = 0;
        let currentCell = false;
        
        for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] === currentCell) {
                count++;
            } else {
                if (count > 0) {
                    lineRle += (count > 1 ? count : '') + (currentCell ? 'o' : 'b');
                }
                currentCell = pattern[row][col];
                count = 1;
            }
        }
        
        if (count > 0) {
            lineRle += (count > 1 ? count : '') + (currentCell ? 'o' : 'b');
        }
        
        rle += lineRle + '$';
    }
    
    return rle + '!';
}

function decodeRLE(rleString) {
    const lines = rleString.split('\n');
    let dimensions = { x: 0, y: 0 };
    let config = {
        zoom: 16,
        gridColor: 'rgb(192, 192, 192)',
        gridMajor: 10,
        colorGridMajor: 'rgb(128, 128, 128)',
        colorAlive: 'rgb(0, 0, 0)',
        colorDead: 'rgb(192, 220, 255)',
        colorBackground: 'rgb(255, 255, 255)'
    };
    
    let inConfigBlock = false;
    
    // Parse configuration and header
    for (const line of lines) {
        if (line.startsWith('#C [[')) {
            inConfigBlock = true;
            continue;
        }
        
        if (inConfigBlock) {
            if (line.includes(']]')) {
                inConfigBlock = false;
                continue;
            }
            
            // Parse configuration parameters
            const [key, ...valueParts] = line.trim().split(' ');
            const value = valueParts.join(' ');
            
            switch(key) {
                case 'ZOOM':
                    config.zoom = parseInt(value);
                    break;
                case 'GRID':
                    if (valueParts[0] === 'COLOR') config.gridColor = value.substring(6);
                    break;
                case 'GRIDMAJOR':
                    config.gridMajor = parseInt(value);
                    break;
                case 'COLOR':
                    if (valueParts[0] === 'GRIDMAJOR') config.colorGridMajor = value.substring(10);
                    else if (valueParts[0] === 'ALIVE') config.colorAlive = value.substring(6);
                    else if (valueParts[0] === 'DEAD') config.colorDead = value.substring(5);
                    else if (valueParts[0] === 'BACKGROUND') config.colorBackground = value.substring(11);
                    break;
            }
            continue;
        }
        
        if (line.startsWith('#')) continue;
        if (line.includes('x =')) {
            const matches = line.match(/x = (\d+), y = (\d+)/);
            if (matches) {
                dimensions.x = parseInt(matches[1]);
                dimensions.y = parseInt(matches[2]);
                break;
            }
        }
    }
    
    // Initialize pattern array
    let pattern = new Array(dimensions.y).fill(null)
        .map(() => new Array(dimensions.x).fill(false));
    
    // Find the pattern data
    let patternData = '';
    let foundPattern = false;
    for (const line of lines) {
        if (!line.startsWith('#') && !line.includes('x =')) {
            if (!foundPattern && line.trim() === '') continue;
            foundPattern = true;
            patternData += line;
        }
    }
    
    // Parse pattern data
    let row = 0;
    let col = 0;
    let count = '';
    
    for (let i = 0; i < patternData.length; i++) {
        const char = patternData[i];
        
        if (char >= '0' && char <= '9') {
            count += char;
        } else if (char === 'b' || char === 'o') {
            const repeat = count === '' ? 1 : parseInt(count);
            for (let j = 0; j < repeat; j++) {
                if (col < dimensions.x) {
                    pattern[row][col] = char === 'o';
                    col++;
                }
            }
            count = '';
        } else if (char === '$') {
            const repeat = count === '' ? 1 : parseInt(count);
            row += repeat;
            col = 0;
            count = '';
        } else if (char === '!') {
            break;
        }
    }
    
    return { pattern, config };
}
