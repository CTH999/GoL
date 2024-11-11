class LifeGrid {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = 30;
        this.isDrawing = false;
        this.currentCellState = false;
        
        // Default configuration with updated values
        this.config = {
            zoom: 16,
            gridColor: 'rgb(0, 0, 0)',
            gridMajor: 1,
            colorGridMajor: 'rgb(0, 0, 0)',
            colorAlive: 'rgb(255, 255, 0)',
            colorDead: 'rgb(192, 220, 255)',
            colorBackground: 'rgb(255, 255, 255)'
        };
        
        this.cells = new Array(this.gridSize).fill(null)
            .map(() => new Array(this.gridSize).fill(false));
        
        this.setupCanvas();
        this.setupEventListeners();
        this.draw();
    }

    // Rest of the class implementation remains the same
    setupCanvas() {
        this.dpr = window.devicePixelRatio || 1;
        
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        const displayWidth = this.canvas.offsetWidth;
        const displayHeight = this.canvas.offsetWidth;
        
        this.canvas.width = displayWidth * this.dpr;
        this.canvas.height = displayHeight * this.dpr;
        
        this.ctx.scale(this.dpr, this.dpr);
        
        this.displayCellSize = Math.floor(displayWidth / this.gridSize);
        this.canvasCellSize = this.displayCellSize * this.dpr;
    }

    setupEventListeners() {
        // Mouse events for drag functionality
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            const cell = this.getCellFromEvent(e);
            if (cell) {
                this.currentCellState = !this.cells[cell.row][cell.col];
                this.handleDrag(e);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDrawing) {
                this.handleDrag(e);
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });
        
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.cells = new Array(this.gridSize).fill(null)
                .map(() => new Array(this.gridSize).fill(false));
            this.draw();
        });

        document.getElementById('gridSize').addEventListener('input', (e) => {
            this.gridSize = parseInt(e.target.value);
            this.cells = new Array(this.gridSize).fill(null)
                .map(() => new Array(this.gridSize).fill(false));
            this.setupCanvas();
            this.draw();
        });

        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.draw();
        });
    }

    getCellFromEvent(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        const col = Math.floor(clickX / this.displayCellSize);
        const row = Math.floor(clickY / this.displayCellSize);
        
        if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            return { row, col };
        }
        return null;
    }

    handleDrag(e) {
        const cell = this.getCellFromEvent(e);
        if (cell) {
            this.cells[cell.row][cell.col] = this.currentCellState;
            this.draw();
        }
    }

    draw() {
        // Clear canvas with background color
        this.ctx.fillStyle = this.config.colorBackground;
        this.ctx.fillRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
        
        // Draw grid lines (all lines are major)
        const totalWidth = this.gridSize * this.displayCellSize;
        this.ctx.strokeStyle = this.config.colorGridMajor;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.gridSize; i++) {
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.displayCellSize, 0);
            this.ctx.lineTo(i * this.displayCellSize, totalWidth);
            this.ctx.stroke();
            
            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.displayCellSize);
            this.ctx.lineTo(totalWidth, i * this.displayCellSize);
            this.ctx.stroke();
        }
        
        // Draw cells
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                this.ctx.fillStyle = this.cells[row][col] ? this.config.colorAlive : this.config.colorDead;
                this.ctx.fillRect(
                    col * this.displayCellSize + 1,
                    row * this.displayCellSize + 1,
                    this.displayCellSize - 2,
                    this.displayCellSize - 2
                );
            }
        }
    }

    getPattern() {
        return {
            pattern: this.cells,
            config: this.config
        };
    }

    setPattern(pattern, config) {
        const maxDim = Math.max(pattern.length, pattern[0].length);
        this.gridSize = maxDim;
        document.getElementById('gridSize').value = this.gridSize;
        
        // Create new cells array with appropriate size
        this.cells = new Array(this.gridSize).fill(null)
            .map(() => new Array(this.gridSize).fill(false));
        
        // Copy pattern into cells
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[0].length; col++) {
                this.cells[row][col] = pattern[row][col];
            }
        }
        
        // Update configuration if provided
        if (config) {
            this.config = { ...this.config, ...config };
        }
        
        this.setupCanvas();
        this.draw();
    }
}

// Initialize the grid when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('grid');
    const grid = new LifeGrid(canvas);
    
    // Export button handler
    document.getElementById('exportBtn').addEventListener('click', () => {
        const { pattern, config } = grid.getPattern();
        const rle = encodeRLE(pattern, config);
        
        // Create and trigger download
        const blob = new Blob([rle], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pattern.rle';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
    
    // Import file handler
    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const { pattern, config } = decodeRLE(event.target.result);
                grid.setPattern(pattern, config);
            };
            reader.readAsText(file);
        }
    });
});
