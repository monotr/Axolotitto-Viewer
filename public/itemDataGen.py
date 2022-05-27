import os
path_of_the_directory= './models/items'

items_data = {}

for item_type in os.listdir(path_of_the_directory):
    f = os.path.join(path_of_the_directory,item_type)
    if os.path.isdir(f):
        print(""+f)
        items_data[item_type] = []

        variantes = []
        for item_name in os.listdir(f):
            item = { 'name': item_name }
            _f = os.path.join(f,item_name)
            if os.path.isdir(_f):
                print("\t"+_f)
                
                for item_model in os.listdir(_f):
                    __f = os.path.join(_f,item_model)
                    if os.path.isfile(__f):
                        print("\t\t"+__f)
                        item["model"] = __f
                    elif os.path.isdir(__f):
                        print("\t\t"+__f)
                        
                        textures = {}
                        for item_texture in os.listdir(__f):
                            ___f = os.path.join(__f,item_texture)
                            print("\t\t\t"+___f)
                            if "BaseColor" in item_texture:
                                textures["colorPath"] = ___f
                            elif "Metallic" in item_texture:
                                textures["metallicPath"] = ___f
                            elif "Roughness" in item_texture:
                                textures["roughnessPath"] = ___f
                            elif "Normal" in item_texture:
                                textures["normalPath"] = ___f

                        variantes.append(textures)

        print(variantes)
        i = 1
        for _var in variantes:
            print(_var)
            newItem = item.copy()
            newItem["textures"] = _var
            if len(variantes) > 1:
                newItem["name"] = item["name"] + " v" + str(i)
            items_data[item_type].append(newItem)
            i = i + 1

print("="*50)
print(items_data)

for item in items_data:
    print(items_data[item])
    with open('../src/models_refs/{}.json'.format(item), 'w+') as outfile:
        _json = "{" + "'{}':{}".format("items", items_data[item]) + "}"
        _json = _json.replace("'", '"')
        _json = _json.replace("\\\\", '/')
        _json = _json.replace("./", '')
        outfile.write(_json)