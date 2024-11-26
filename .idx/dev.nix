{pkgs}: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.docker
    pkgs.docker-compose
    pkgs.yarn
    pkgs.neofetch
  ];
   # Sets environment variables in the workspace
  env = {};
  services.docker.enable = true;
  
  idx.extensions = [
    
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}