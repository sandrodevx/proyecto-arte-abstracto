from flask import Flask, render_template, request, jsonify
import base64
from PIL import Image, ImageFilter
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/guardar', methods=['POST'])
def guardar():
    data = request.json
    imagen_base64 = data['imagen'].split(',')[1]
    imagen_bytes = base64.b64decode(imagen_base64)
    imagen = Image.open(BytesIO(imagen_bytes))

    # Aplicar un efecto (ejemplo: desenfoque)
    imagen = imagen.filter(ImageFilter.BLUR)

    # Guardar la imagen procesada
    buffered = BytesIO()
    imagen.save(buffered, format="PNG")
    imagen_procesada = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return jsonify({'imagen': f"data:image/png;base64,{imagen_procesada}"})

if __name__ == '__main__':
    app.run(debug=True)