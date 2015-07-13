chmod 600 .ssh/id_rsa

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i .ssh/id_rsa"  mobile-E/* www-data@aljazeera.io:/var/www/html/aje/PalestineRemix/mobile/
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i .ssh/id_rsa"  mobile-A/* www-data@aljazeera.io:/var/www/html/aja/PalestineRemix/mobile/
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i .ssh/id_rsa"  mobile-B/* www-data@aljazeera.io:/var/www/html/ajb/PalestineRemix/mobile/
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i .ssh/id_rsa"  mobile-T/* www-data@aljazeera.io:/var/www/html/ajt/PalestineRemix/mobile/
