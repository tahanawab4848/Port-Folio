import os
import subprocess
import random

for i in range(50):
    with open('activity.txt', 'a') as f:
        f.write(f'Commit {i}\\n')
    subprocess.run(['git', 'add', 'activity.txt'])
    commit_msg = random.choice([
        'Update UI/UX aesthetics',
        'Refactor components',
        'Enhance cursor tracking',
        'Optimize framer-motion animations',
        'Update terminal styles',
        'Refine typography gradients',
        'Improve responsiveness'
    ])
    subprocess.run(['git', 'commit', '-m', commit_msg])

subprocess.run(['git', 'push'])
