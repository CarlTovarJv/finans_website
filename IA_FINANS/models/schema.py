def validar_datos(data):

    if not isinstance(data, list):
        return False

    for item in data:

        if not isinstance(item, dict):
            return False

        required = [
            "producto",
            "monto",
            "fecha"
        ]

        for campo in required:

            if campo not in item:
                return False

    return True