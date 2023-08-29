import sys
import json

inputFile = ''
outputFile = ''

outputContent = {}

# Super janky script to parse right_student_schedule.jsp and save as readable json

def getInput():

    global inputFile, outputFile

    inputFile = input("Input file: ")
    outputFile = input("Output file: ")

def main():

    global inputFile, outputFile
    
    # Set input and output file if not specified
    if inputFile == '': inputFile = 'right_student_schedule.jsp'
    if outputFile == '': outputFile = 'output.json'

    with open(inputFile,'r') as f:

        line = 0 # Start at line 0

        hitSchedules = False

        # Go through all lines of file
        for x in f.readlines():

            line += 1 # Increment line counter

            if 'class="tab' in x:   # Skip all the unnecessary stuff
                hitSchedules = True
                continue

            # Skip other unnecessary stuff
            if not hitSchedules or not 'href="right_student_schedule.jsp?lesson=' in x: continue
            
            # Prepare entry to add to dict
            entry = {}

            # Extract weeks active
            weeks = []

            sectionStartIndex = x.find('Veckor') + 8 # Find start of week section
            sectionEndIndex = x.find('<',sectionStartIndex) # Find end of week section

            for y in x[sectionStartIndex:sectionEndIndex].split(', '): # Split string of extracted weeks

                if '-' in y: # If processed week is a range, add all weeks in range
                    z = y.split('-')
                    for n in range(int(z[0]), int(z[1])+1):
                        weeks.append(n)
                else: # If not a range, just add the week
                    weeks.append(int(y))


            # Extract lesson ID
            lesson_id = 0

            sectionStartIndex = x.find('lesson=') + 7
            sectionEndIndex = x.find('&',sectionStartIndex)

            lesson_id = x[sectionStartIndex:sectionEndIndex]


            # Extract class name
            name = ''

            sectionStartIndex = x.find('title="">') + 16
            sectionEndIndex = x.find('<',sectionStartIndex)

            name = x[sectionStartIndex:sectionEndIndex]


            # Extract class times
            classStart = '00:00'
            classEnd = '00:00'

            sectionStartIndex = x.find('>',sectionEndIndex) + 1
            sectionEndIndex = x.find('<',sectionStartIndex)

            y = x[sectionStartIndex:sectionEndIndex].split('-')
            classStart = y[0]
            classEnd = y[1]

            # Extract room id
            room = '0'

            sectionStartIndex = x.find('>',sectionEndIndex) + 1
            sectionEndIndex = len(x)

            room = x[sectionStartIndex:sectionEndIndex].strip('\n')


            # Add all extracted values to entry
            entry['name'] = name
            entry['room'] = room
            entry['starts'] = classStart
            entry['ends'] = classEnd
            entry['weeks'] = weeks

            outputContent[lesson_id] = entry
        
        f.close()

    with open(outputFile, 'w') as file:
        json.dump(outputContent, file)
    

        
            

if __name__ == '__main__':
    getInput()
else:
    inputFile = sys.argv[0]
    outputFile = sys.argv[1]

main()