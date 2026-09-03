import json
import re


def escape_latex(text):
  if not text:
    return ""
  
  # Remove website citation references
  text = re.sub(r"\[cite:[^\]]+\]", "", str(text))
  # Escape special LaTeX characters safely
  # Order matters: backslash first
  chars = {
      "\\": "\\textbackslash{}",
      "&": "\\&",
      "%": "\\%",
      "$": "\\$",
      "#": "\\#",
      "_": "\\_",
      "{": "\\{",
      "}": "\\}",
      "~": "\\textasciitilde{}",
      "^": "\\textasciicircum{}",
  }
  return re.sub(
      r"([\\&#%$_{}~^])", lambda m: chars[m.group(1)], str(text)
  )


def generate_latex(json_file_path, output_file_path):
  with open(json_file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

  # Extract basics
  basics = data.get("basics", {})
  name_parts = basics.get("name", "Name").split(" ", 1)
  first_name = escape_latex(name_parts[0])
  last_name = escape_latex(name_parts[1] if len(name_parts) > 1 else "")

  phone = escape_latex(basics.get("phone", ""))
  email = basics.get("email", "")
  linkedin_url = ""
  for profile in basics.get("profiles", []):
    if profile.get("network") == "LinkedIn":
      linkedin_url = profile.get("url", "")

  # Summary
  summary = escape_latex(data.get("summary", ""))

  # Experience
  experience_tex = []
  for job in data.get("work", []):
    title = escape_latex(job.get("position", ""))
    company = escape_latex(job.get("name", ""))
    start = escape_latex(job.get("startDate", ""))
    end = escape_latex(job.get("endDate", "present"))
    date_str = f"\\textbf{{{start}}} -- \\textbf{{{end}}}"

    highlights_tex = []
    for h in job.get("highlights", []):
      highlights_tex.append(f"      \\resumeItem{{{escape_latex(h)}}}")

    highlights_block = "\n".join(highlights_tex)

    job_block = f"""    \\resumeSubheading
    {{{title}}}{{{company}}}
    {{}}{{{date_str}}}
    \\resumeItemListStart
{highlights_block}
    \\resumeItemListEnd"""
    experience_tex.append(job_block)

  experience_section = "\n".join(experience_tex)

  # Skills Grouping
  skills_tex = []
  for skill_group in data.get("skills", []):
    category = escape_latex(skill_group.get("category", ""))
    keywords = ", ".join(
        [escape_latex(k) for k in skill_group.get("keywords", [])]
    )
    skills_tex.append(f"""    \\resumeSubheading
     {{{category}}}{{}}{{}}
     {{}}{{}}
     \\resumeItemListStart
     \\vspace{{-5mm}}
     \\resumeItem{{{keywords}}}
       \\resumeItemListEnd""")
  skills_section = "\n".join(skills_tex)

  # Education
  education_tex = []
  for edu in data.get("education", []):
    degree_type = escape_latex(edu.get("studyType", ""))
    area = escape_latex(edu.get("area", ""))
    degree_str = f"{degree_type} in {area}" if area else degree_type
    institution = escape_latex(edu.get("institution", ""))
    score = escape_latex(edu.get("score", ""))
    start = escape_latex(edu.get("startDate", ""))
    end = escape_latex(edu.get("endDate", ""))
    date_str = (
        f"\\textbf{{{start}}} -- \\textbf{{{end}}}"
        if start and end
        else f"\\textbf{{{start or end}}}"
    )

    education_tex.append(f"""    \\resumeSubheading
      {{{degree_str}}}{{{institution}}}
      {{\\textit{{{score}}}}}{{{date_str}}}""")
  education_section = "\n\\vspace{1mm}\n".join(education_tex)

  # Assemble Template
  latex_template = f"""\\documentclass[letterpaper,11pt]{{article}}

\\usepackage{{latexsym}}
\\usepackage{{standalone}}
\\usepackage{{titlesec}}
\\usepackage{{marvosym}}
\\usepackage[usenames,dvipsnames]{{color}}
\\usepackage{{verbatim}}
\\usepackage{{enumitem}}
\\usepackage[hidelinks]{{hyperref}}
\\usepackage{{fancyhdr}}
\\usepackage[english]{{babel}}
\\usepackage{{tabularx}}
\\input{{glyphtounicode}}

\\pagestyle{{fancy}}
\\fancyhf{{}} 
\\fancyfoot{{}}
\\renewcommand{{\\headrulewidth}}{{0pt}}
\\renewcommand{{\\footrulewidth}}{{0pt}}

% Adjust margins for a compact layout
\\usepackage[paperwidth=210mm, paperheight=5000mm, margin=0.75in]{{geometry}}

\\urlstyle{{same}}

\\raggedbottom
\\raggedright
\\setlength{{\\tabcolsep}}{{0in}}

% Sections formatting
\\titleformat{{\\section}}{{
  \\vspace{{-4pt}}\\scshape\\raggedright\\large
}}{{}}{{0em}}{{}}[\\color{{black}}\\titlerule \\vspace{{-5pt}}]

% Ensure that generated pdf is machine readable/ATS parsable
\\pdfgentounicode=1

% Custom commands
\\newcommand{{\\resumeItem}}[1]{{
  \\item\\small{{
    {{#1 \\vspace{{-2pt}}}}
  }}
}}

\\newcommand{{\\resumeSubheading}}[4]{{
  \\vspace{{-2pt}}\\item
    \\begin{{tabular*}}{{0.97\\textwidth}}[t]{{l@{{\\extracolsep{{\\fill}}}}r}}
      \\textbf{{#1}} & #2 \\\\
      \\textit{{\\small#3}} & \\textit{{\\small #4}} \\\\
    \\end{{tabular*}}\\vspace{{-7pt}}
}}

\\newcommand{{\\resumeSubSubheading}}[2]{{
    \\item
    \\begin{{tabular*}}{{0.97\\textwidth}}{{l@{{\\extracolsep{{\\fill}}}}r}}
      \\textit{{\\small#1}} & \\textit{{\\small #2}} \\\\
    \\end{{tabular*}}\\vspace{{-7pt}}
}}

\\newcommand{{\\resumeProjectHeading}}[2]{{
    \\item
    \\begin{{tabular*}}{{0.97\\textwidth}}{{l@{{\\extracolsep{{\\fill}}}}r}}
      \\small#1 & #2 \\\\
    \\end{{tabular*}}\\vspace{{-7pt}}
}}

\\newcommand{{\\resumeSubItem}}[1]{{\\resumeItem{{#1}}\\vspace{{-4pt}}}}

\\renewcommand\\labelitemii{{$\\vcenter{{\\hbox{{\\tiny$\\bullet$}}}}$}}

\\newcommand{{\\resumeSubHeadingListStart}}{{\\begin{{itemize}}[leftmargin=0.15in, label={{}}]}}
\\newcommand{{\\resumeSubHeadingListEnd}}{{\\end{{itemize}}}}
\\newcommand{{\\resumeItemListStart}}{{\\begin{{itemize}}}}
\\newcommand{{\\resumeItemListEnd}}{{\\end{{itemize}}\\vspace{{-5pt}}}}

%-------------------------------------------
%%%%%%  RESUME TEMPLATE STARTS HERE  %%%%%%%%

\\begin{{document}}

\\begin{{center}}
    \\textbf{{\\Huge \\scshape {first_name} {last_name}}}
\\end{{center}}

%-----------Summary-----------
\\section{{Summary}}
{summary}

%-----------Experience-----------
\\section{{Experience}}    
\\resumeSubHeadingListStart
{experience_section}
\\resumeSubHeadingListEnd

%-----------Skills-----------
\\section{{Skills}}
\\resumeSubHeadingListStart
{skills_section}
\\resumeSubHeadingListEnd

%-----------Education-----------
\\section{{Education}}
  \\resumeSubHeadingListStart
{education_section}
  \\resumeSubHeadingListEnd
  
%-----------Contact Info-----------

\\vspace{{3mm}}

\\begin{{center}}
\\small {phone} $|$
\\href{{mailto:{email}}}{{\\underline{{{email}}}}} $|$
\\href{{{linkedin_url}}}{{\\underline{{linkedin.com/in/{linkedin_url.split('/')[-1]}}}}}
\\end{{center}}

\\end{{document}}
"""

  import os
  import subprocess

  with open(output_file_path, "w", encoding="utf-8") as f:
    f.write(latex_template)
  print(f"Successfully generated LaTeX file at: {output_file_path}")

  # Compile to PDF
  outdir = os.path.dirname(output_file_path) or "."
  try:
    print("Compiling PDF...")
    subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", "-output-directory", outdir, output_file_path],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=True
    )
    pdf_path = output_file_path.replace(".tex", ".pdf")
    print(f"Successfully generated PDF at: {pdf_path}")
  except FileNotFoundError:
    print("Warning: 'pdflatex' command not found. Please install a LaTeX distribution (e.g. sudo apt install texlive-latex-base texlive-latex-extra texlive-fonts-recommended) to generate PDFs automatically.")
  except subprocess.CalledProcessError:
    print("Error: LaTeX compilation failed. Please check the generated .tex file for errors.")


if __name__ == "__main__":
  import argparse
  import os

  parser = argparse.ArgumentParser(description="Generate LaTeX CV from JSON")
  parser.add_argument("--json", default="src/_data/cv.json", help="Path to the JSON CV file source")
  parser.add_argument("--job", default="", help="Job name to customize the output filename")
  parser.add_argument("--outdir", default="CVs", help="Output directory for the generated CV")
  args = parser.parse_args()

  os.makedirs(args.outdir, exist_ok=True)
  
  if args.job:
    filename = f"CV - Andrew McLoughlin - {args.job}.tex"
  else:
    filename = "CV - Andrew McLoughlin.tex"
    
  output_path = os.path.join(args.outdir, filename)
  
  generate_latex(args.json, output_path)