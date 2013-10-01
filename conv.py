from sys import argv, exit
from os import walk, chdir
import re

URL_TEMPLATE = 'http://docs.oracle.com/javame/config/cldc/ref-impl/midp2.0/jsr118/%s.html'

method_regexp = re.compile('<PRE>.{0,500}?\)</PRE>')

if len(argv) < 2:
	exit()

root_path = argv[1]
chdir(root_path)
for directory, _, files in walk('.'):
	for filename in files:
		if filename.endswith('.js'):
			#print(filename)
			url = URL_TEMPLATE % (directory + '/' + filename[:-3])
			print(url)
			from urllib.request import urlopen
			from urllib.error import HTTPError
			docs = []
			try:
				request = urlopen(url)
				docs = method_regexp.findall(str(request.read()))
			except HTTPError:
				print('ERROR')
			#print(docs)
			
			for index, value in enumerate(docs):
				#print(value)
				#print('*******')
				value = re.sub(r'<[^<>]+>|\\r|\\n', '', value).strip();
				value = re.sub(r'&nbsp;|\s+', ' ', value)
				docs[index] = value
				#args = len(value[value.find('('):value.find(')')].split(','))
					
			content = ''
			for line in open(directory + '/' + filename):
				if 'function' in line:
					parts = line.split('$')
					
					#print(parts)
					if len(parts) > 1:
						comment = '\t/*\n\t * '
						
						if not '_init' in line:
							funcname = parts[1]
						else:
							funcname = filename[filename.rfind('/'):-3] + '('
						for method_doc in docs:
							if funcname in method_doc:
								comment += method_doc
								break
						comment += '\n\t */\n'
						content += comment
				content += line
			f = open(directory + '/' + filename, 'w')
			f.write(content)
			f.close()
			#print(content)
			
